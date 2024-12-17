export async function solve(): Promise<string> {
  const file = await Deno.readTextFile("day1/input.txt");
  const lines = file.trim().split("\n");

  const column1: number[] = [];
  const column2: number[] = [];

  for (const line of lines) {
    const [col1, col2] = line.trim().split(/\s+/).map(Number);
    if (!isNaN(col1)) column1.push(col1);
    if (!isNaN(col2)) column2.push(col2);
  }

  const sortedColumn1 = column1.sort((a, b) => a - b);
  const sortedColumn2 = column2.sort((a, b) => a - b);

  const distances: number[] = [];
  const length = Math.min(sortedColumn1.length, sortedColumn2.length);

  for (let i = 0; i < length; i++) {
    const diff = Math.abs(sortedColumn1[i] - sortedColumn2[i]);
    distances.push(diff);
  }

  const totalDistance = distances
    .reduce((sum, value) => sum + value, 0)
    .toString();

  const similarities: number[] = [];

  for (const num of sortedColumn1) {
    const count = sortedColumn2.filter((val) => val === num).length;
    similarities.push(num * count);
  }

  const totalSimilarity = similarities
    .reduce((sum, value) => sum + value, 0)
    .toString();

  const answer: string = `Part 1: ${totalDistance}\nPart 2: ${totalSimilarity}`;
  return answer;
}

export function isReportSafe(levels: number[]): boolean {
  if (levels.length < 2) return false;

  const isIncreasing = levels.every(
    (num, i, arr) => i === 0 || num > arr[i - 1]
  );
  const isDecreasing = levels.every(
    (num, i, arr) => i === 0 || num < arr[i - 1]
  );

  if (!isIncreasing && !isDecreasing) return false;

  const isDiffValid = levels.every(
    (num, i, arr) =>
      i === 0 ||
      (Math.abs(num - arr[i - 1]) >= 1 && Math.abs(num - arr[i - 1]) <= 3)
  );

  return isDiffValid;
}

export async function GET(_req: Request): Promise<Response> {
  // console.log(_req);
  return new Response(await solve(), { status: 200 });
}
