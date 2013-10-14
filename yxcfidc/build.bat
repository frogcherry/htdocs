@echo off
echo Deleting old yxcfidc.js...
del js\yxcfidc.js

echo Building yxcfidc.js...

echo /** >> js\yxcfidc.js
echo  * This file was generated by build.bat. >> js\yxcfidc.js
echo  * DO NOT modify it. >> js\yxcfidc.js
echo  **/ >> js\yxcfidc.js

echo 1. Building tools package...
type src\tools\jquery.smart-float.js >> js\yxcfidc.js

echo 2. Building data package...
type src\data\idc-ct.js >> js\yxcfidc.js

echo 3. Building ui package...
type src\ui\ct.js >> js\yxcfidc.js

echo Done.

echo Building yxcfidc-min.js...
node uglifyjs\uglifyjs -nc -o js\yxcfidc-min.js js\yxcfidc.js
echo Done.
