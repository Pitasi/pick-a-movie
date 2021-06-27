#!/bin/bash -e
npx @openapitools/openapi-generator-cli generate \
    -g typescript-fetch \
    -i ../backend/docs/swagger.yaml \
    -o src/connectors
