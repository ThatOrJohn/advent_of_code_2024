export async function solve(): Promise<string> {
  const file = await Deno.readTextFile("day2/input.txt");
  const reports = file.trim().split("\n");

  let totalSafeUndampened: number = 0;
  let totalSafeDampened: number = 0;

  for (const levels of reports) {
    const levelsArray = levels.trim().split(/\s+/).map(Number);

    if (isReportSafe(levelsArray)) {
      totalSafeUndampened++;
    } else {
      // Problem dampener
      let dampenerCounter = 0;
      const levelCount = levelsArray.length;

      while (dampenerCounter < levelCount) {
        const dampenedReport = levelsArray.filter(
          (_, index) => index !== dampenerCounter
        );
        //console.log(
        //  `${dampenerCounter} ${levelCount} ${dampenedReport} ${levelsArray}`
        //);

        if (isReportSafe(dampenedReport)) {
          totalSafeDampened++;
          break;
        }

        dampenerCounter++;
      }
    }

    //console.log(`${levelArray}`);
  }
  return `Part 1: ${totalSafeUndampened.toString()}\nPart 2: ${(
    totalSafeUndampened + totalSafeDampened
  ).toString()}`;
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
