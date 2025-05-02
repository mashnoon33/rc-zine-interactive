import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground">
        Anonymous User - ID: {user?.id || "N/A"}
      </span>
    </div>
  );
}
