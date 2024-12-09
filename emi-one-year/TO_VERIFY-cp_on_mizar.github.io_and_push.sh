#!/bin/bash
d=$(pwd)
cp ../$d ../mizar.github.io/
cd ../mizar.github.io/
git commit -a -m "Added updated version of emi-one-year"
git push
cd ../$d