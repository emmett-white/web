import { statSync, readFileSync } from "fs";
import { resolve } from "path";

export const exists = (path: string): boolean => {
  try {
    statSync(path);
    return true;
  } catch {
    return false;
  }
};

export const readMdFromLocal = async (path: string): Promise<string> => {
  if (path === "") {
    path = "index";
  }

  const path_mdx = path + ".mdx";
  const path_md = path + ".md";

  if (exists(path_mdx)) {
    return readFileSync(path_mdx).toString();
  }

  if (exists(path_md)) {
    return readFileSync(path_md).toString();
  }

  return undefined;
};

export const readMdFromAPI = async (path: string): Promise<string> => {
  if (path === "") {
    path = "index";
  }

  const path_mdx = path + ".mdx";
  const path_md = path + ".md";

  let response: Response;

  // TODO: Perform the md/mdx differentiation on the API, instead of here.

  response = await fetch("https://api.open.mp/docs/" + path_md);
  if (response.status === 200) {
    return await response.text();
  }

  response = await fetch("https://api.open.mp/docs/" + path_mdx);
  if (response.status === 200) {
    return await response.text();
  }

  return undefined;
};

export const readLocaleContent = async (name: string, locale: string) => {
  let source = await readMdFromLocal(resolve("content", locale, name));
  if (source !== undefined) {
    return { source, fallback: false };
  }

  source = await readMdFromLocal(resolve("content", "en", name));
  if (source !== undefined) {
    return { source, fallback: true };
  }

  throw new Error("Not found");
};

export const readLocaleDocs = async (name: string, locale?: string) => {
  let fullName = name;
  if (locale && locale != "en") {
    fullName = `translations/${locale}/${name}`;
  }

  let source = await readMdFromAPI(fullName);
  if (source !== undefined) {
    return { source, fallback: false, fullName };
  }

  source = await readMdFromAPI(name);
  if (source !== undefined) {
    return { source, fallback: true, name };
  }

  // If the API does not respond with a page, this final fallback attempts to
  // load the content from the local filesystem. This ONLY works at build-time
  // on Vercel because the content in ../docs isn't added to the serverless
  // environment. This is only used for previewing changes currently.
  if (process.env.VERCEL_ENV === "preview") {
    source = await readMdFromLocal(name);
    if (source !== undefined) {
      return { source, fallback: false, name };
    }
  }

  throw new Error(`Not found (${name})`);
};
