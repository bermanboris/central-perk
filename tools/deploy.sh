#!/bin/bash

cd ..

gcloud builds submit --tag gcr.io/central-perk/api

