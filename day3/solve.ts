export async function solve(): Promise<string> {
  const file = await Deno.readTextFile("day3/input.txt");
  const lines = file.trim().split("\n");

  const mulOps: string[] = [];
  const mulRegex = /mul\(\d{1,3},\d{1,3}\)/g;

  for (const line of lines) {
    const matches = Array.from(line.matchAll(mulRegex)).map(
      (match) => match[0]
    );
    mulOps.push(...matches);
  }

  const mulResults = mulOps.reduce((sum, expr) => {
    const mulInputs = expr.match(/\((\d+),(\d+)\)/);
    if (!mulInputs) return sum;
    const [, arg1, arg2] = mulInputs.map(Number);
    return sum + arg1 * arg2;
  }, 0);

  return `Part 1: ${mulResults.toString()}`;
}

export async function GET(_req: Request): Promise<Response> {
  // console.log(_req);
  return new Response(await solve(), { status: 200 });
}
