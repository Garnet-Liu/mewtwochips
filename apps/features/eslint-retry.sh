#!/bin/bash
MAX_RETRIES=3
COUNT=0

echo "ESLint start..."

while [ $COUNT -lt $MAX_RETRIES ]; do
  echo "ESLint run #$((COUNT+1))."

  # Run eslint, allow failure but capture the exit code
  eslint "./src/graphql/schema/**/*.ts" --fix
  STATUS=$?

  if [ $STATUS -eq 0 ]; then
    echo "ESLint passed with no errors."
    exit 0
  fi

  COUNT=$((COUNT+1))
done

echo "ESLint still has errors after $MAX_RETRIES retries."
exit 1
