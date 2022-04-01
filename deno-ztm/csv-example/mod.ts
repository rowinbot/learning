import {join} from "https://deno.land/std/path/mod.ts"

async function readFile(filePath: string) {
  const path = join('.', 'text', filePath);

  console.log(path);

  try {
    const data = await Deno.readTextFile(path);
  
    console.log(`File content: ${data}`);
  } catch(err) {
    if (err instanceof Error) {
      console.log(`Error getting ${filePath}. Unreachable file.`);
    }
  }
}

async function printDir() {
  for await (const dirEntry of Deno.readDir('.')) {
    console.log(dirEntry.name);
  }
}


try {
  const {args} = Deno;
  const fileName: string | null = args[0]

  if (!fileName) {
    throw new Error("Use: deno run mod.ts <fileName>");
  }
  
  await readFile(fileName);
  await printDir();
} catch(err) {
  console.log(err.message);
}