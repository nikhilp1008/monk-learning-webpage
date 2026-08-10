"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

type PlanItemRow = Database["public"]["Tables"]["plan_items"]["Row"];

function todayDate() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function TodaysPlan() {
  const [userId, setUserId] = useState<string | null>(null);
  const [items, setItems] = useState<PlanItemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newLabel, setNewLabel] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!isMounted) return;
        setUserId(user?.id || null);

        if (!user) {
          setItems([]);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("plan_items")
          .select("*")
          .eq("user_id", user.id)
          .eq("plan_date", todayDate())
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: true });

        if (error) throw error;
        if (isMounted) setItems(data || []);
      } catch (err) {
        console.error("Failed to load today's plan:", err);
        if (isMounted) setItems([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleItem = async (item: PlanItemRow) => {
    const nextDone = !item.is_done;
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, is_done: nextDone } : i))
    );
    const { error } = await supabase
      .from("plan_items")
      .update({ is_done: nextDone })
      .eq("id", item.id);
    if (error) {
      console.error("Failed to update plan item:", error);
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, is_done: item.is_done } : i))
      );
    }
  };

  const addItem = async () => {
    const label = newLabel.trim();
    if (!label || !userId) return;

    const { data, error } = await supabase
      .from("plan_items")
      .insert({
        user_id: userId,
        plan_date: todayDate(),
        label,
        sort_order: items.length,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to add plan item:", error);
      return;
    }

    if (data) setItems((prev) => [...prev, data]);
    setNewLabel("");
    setAdding(false);
  };

  const doneCount = items.filter((i) => i.is_done).length;

  return (
    <div className="bg-white border border-[rgba(28,26,22,0.08)] rounded-[18px] p-[18px_22px] shadow-ref-stat flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2.5 mb-2">
          <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-[#9C988C]">
            Today&apos;s plan
          </span>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <span className="font-extrabold text-[0.58rem] tracking-wider uppercase text-green-badge bg-green-badge/10 px-2 py-0.5 rounded-full">
                {doneCount} of {items.length} done
              </span>
            )}
            {userId && (
              <button
                onClick={() => setAdding((a) => !a)}
                className="font-extrabold text-[0.58rem] tracking-wider uppercase text-ink-light border border-border-subtle rounded-full px-2.5 py-1 hover:border-ink transition-colors cursor-pointer"
              >
                + Add plan
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2 py-2">
          {loading ? (
            <div className="py-4 text-center text-xs text-ink-muted font-semibold">
              Loading…
            </div>
          ) : !userId ? (
            <div className="py-4 text-center text-xs text-ink-muted font-semibold">
              Sign in to build today&apos;s plan.
            </div>
          ) : items.length === 0 && !adding ? (
            <div className="py-4 text-center text-xs text-ink-muted font-semibold">
              Nothing planned yet — add your first task.
            </div>
          ) : (
            items.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item)}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-[#FBF8EF] border border-border-subtle/70 text-xs text-ink-light font-medium text-left hover:bg-[#F4EFE3] transition-colors cursor-pointer"
              >
                <span
                  className={`w-4 h-4 rounded border flex-none grid place-items-center transition-colors ${
                    item.is_done
                      ? "bg-green-badge border-green-badge"
                      : "border-ink/20"
                  }`}
                >
                  {item.is_done && (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-2.5 h-2.5 stroke-white"
                      fill="none"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className={item.is_done ? "line-through text-ink-muted" : ""}>
                  {item.label}
                </span>
                {item.minutes && (
                  <span className="ml-auto flex-none text-ink-muted">
                    {item.minutes} min
                  </span>
                )}
              </button>
            ))
          )}

          {adding && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FBF8EF] border border-border-subtle/70">
              <input
                autoFocus
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addItem();
                  if (e.key === "Escape") setAdding(false);
                }}
                placeholder="e.g. Revise Kinematics notes"
                className="flex-1 min-w-0 bg-transparent text-xs text-ink font-medium outline-none placeholder:text-ink-muted"
              />
              <button
                onClick={addItem}
                className="font-bold text-[0.7rem] text-orange-dark cursor-pointer flex-none"
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
