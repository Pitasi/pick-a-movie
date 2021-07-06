#!/bin/bash -e

cd "$(dirname "$0")"

npx @openapitools/openapi-generator-cli generate \
    -g typescript-axios \
    -i ../backend/docs/swagger.yaml \
    -o src/connectors
