#!/bin/bash

set -ex

echo "Set chown for persisted data"
sudo chown vscode node_modules

echo "Run npm install"
npm install

echo "Done!"
