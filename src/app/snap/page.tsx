import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SnapClient } from "./SnapClient";

export const dynamic = "force-dynamic";

export default async function SnapPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <SnapClient />;
}
