import {
  handleContactRequest,
  type ContactEnv,
} from "../../contact-api/src/index";

/** Cloudflare Pages Function — same handler as the standalone Worker. */
export async function onRequest(context: {
  request: Request;
  env: ContactEnv;
}): Promise<Response> {
  return handleContactRequest(context.request, context.env);
}
