#!/bin/bash

VERSION=""

# Get parameters
while getopts v: flag
do
    case "${flag}" in
        v) VERSION=${OPTARG};;
    esac
done

# Get highest tag number, and add v0.1.0 if doesn't exist
git fetch --prune --unshallow 2>/dev/null
CURRENT_VERSION=`git describe --abbrev=0 --tags 2>/dev/null`


if [[ -z $CURRENT_VERSION ]]
then
    CURRENT_VERSION='v0.1.0'
fi
echo "Current version: $CURRENT_VERSION"

# replace . with space so can split into an array
CURRENT_VERSION_PARTS=(${CURRENT_VERSION//./ })

# get number of parts
VNUMB1=${CURRENT_VERSION_PARTS[0]}
VNUMB2=${CURRENT_VERSION_PARTS[1]}
VNUMB3=${CURRENT_VERSION_PARTS[2]}

if [[ $VERSION == 'major' ]]
then
    VNUMB1=$((VNUMB1 + 1))
    VNUMB2=0
    VNUMB3=0
elif [[ $VERSION == 'minor' ]]
then
    VNUMB2=$((VNUMB2 + 1))
    VNUMB3=0
elif [[ $VERSION == 'patch' ]]
then
    VNUMB3=$((VNUMB3 + 1))
else
    echo "Invalid version type. Use 'major', 'minor', or 'patch'."
    exit 1
fi

NEW_TAG="v$VNUMB1.$VNUMB2.$VNUMB3"
echo "New version: $NEW_TAG"

# get current hash and see if it already has a tag
GIT_COMMIT=`git rev-parse HEAD`
NEEDS_TAG=`git describe --contains $GIT_COMMIT 2>/dev/null`

# only tag if no tag already
if [ -z "$NEEDS_TAG" ]; then
    git tag $NEW_TAG
    git push --tags
    git push
else
    echo "Current commit already tagged with $NEEDS_TAG. No new tag created."
fi

echo ::set-output name=git-tag::$NEW_TAG

exit 0