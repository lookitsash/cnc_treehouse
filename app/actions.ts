"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSubscriber, deleteSubscriber } from "./lib/newsletter";

export async function addSubscriber(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!name || !email) {
    return "Name and email are required.";
  }

  try {
    await createSubscriber(name, email);
  } catch {
    return "Could not add the subscriber. Please try again.";
  }

  revalidatePath("/");
  redirect("/?added=1");
}

export async function removeSubscriber(id: string) {
  await deleteSubscriber(id);
  revalidatePath("/");
}
