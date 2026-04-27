#!/bin/bash

set -e  # Exit on any error

VERSION=""

# Get parameters
while getopts v: flag
do
    case "${flag}" in
        v) VERSION=${OPTARG};;
    esac
done

# Get highest tag number, and add v0.1.0 if doesn't exist
echo "Fetching git tags..."
git fetch --tags 2>/dev/null || true
CURRENT_VERSION=$(git describe --abbrev=0 --tags 2>/dev/null || echo "")

echo "Current version from git: '$CURRENT_VERSION'"

if [[ -z $CURRENT_VERSION ]]
then
    CURRENT_VERSION='v0.1.0'
    echo "No tags found, starting with: $CURRENT_VERSION"
fi
echo "Using version: $CURRENT_VERSION"

# Remove 'v' prefix if it exists
CURRENT_VERSION_CLEAN=${CURRENT_VERSION#v}

# replace . with space so can split into an array
CURRENT_VERSION_PARTS=(${CURRENT_VERSION_CLEAN//./ })

# get number parts
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
GIT_COMMIT=$(git rev-parse HEAD)
NEEDS_TAG=$(git describe --contains $GIT_COMMIT 2>/dev/null || echo "")

# only tag if no tag already
if [[ -z "$NEEDS_TAG" ]]; then
    echo "Creating new tag: $NEW_TAG"
    git tag $NEW_TAG
    echo "Pushing tag..."
    git push origin $NEW_TAG || echo "Warning: Could not push tag (may need credentials)"
    echo "Pushing commits..."
    git push origin main || echo "Warning: Could not push commits (may need credentials)"
else
    echo "Current commit already tagged with $NEEDS_TAG. No new tag created."
    NEW_TAG=$NEEDS_TAG
fi

echo "Final tag: $NEW_TAG"
echo "git-tag=$NEW_TAG" >> $GITHUB_OUTPUT

exit 0