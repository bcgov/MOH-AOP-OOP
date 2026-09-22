// Skip Husky install in production and CI
if (process.env.NODE_ENV === "production" || process.env.CI === "true") {
  process.exit(0);
}

try {
  const husky = (await import("husky")).default;
  console.log(husky());
} catch (error) {
  console.error(
    "\n",
    `[ERROR] Husky failed. Run 'npm i' in the Microservices project root to install Git hook dependencies`,
    "\n"
  );
  console.error("More information:", error);
  process.exit(1);
}