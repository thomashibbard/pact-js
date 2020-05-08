#!/bin/bash -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

npm run dist

${DIR}/prepare.sh

# Link the build so that the examples are always testing the
# current build, in it's properly exported format
(cd dist && npm link)
(cd dist-web && npm link)

echo "Running e2e examples build for node version ${TRAVIS_NODE_VERSION}"
for i in $(find ./examples -name package.json | grep -v node_modules); do
  EXAMPLE_PATH=$(dirname $i)
  echo "--> running tests for: $EXAMPLE_PATH"
  if [[ "$EXAMPLE_PATH" == *"karma" ]]; then
    (cd "$EXAMPLE_PATH" && npm i && npm link @pact-foundation/pact-web && npm t)
  else
    (cd "$EXAMPLE_PATH" && npm i && npm link @pact-foundation/pact && npm t)
  fi
done

echo "--> Running coverage checks"
npm run coverage
