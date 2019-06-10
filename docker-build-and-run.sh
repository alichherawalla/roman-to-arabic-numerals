#!/usr/bin/env bash
docker build -t roman-to-arabic .
docker run -p 3000:3000 roman-to-arabic
