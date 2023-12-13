#!/bin/zsh
source_svg_components="./svgrComponents"
destination_svg_components="../../src/components/svg/"

original_svgs_input="./originalSvgs"
destination_original_svgs="../../public/assets/images/svgs"

# Function to check if a directory exists
check_directory_exists() {
  if [ ! -d "$1" ]; then
    echo "Error: Directory '$1' does not exist. Exiting"
    exit 1
  fi
}

# Check if all four directories exist
check_directory_exists "$source_svg_components"
check_directory_exists "$destination_svg_components"
check_directory_exists "$original_svgs_input"
check_directory_exists "$destination_original_svgs"

npx @svgr/cli \
  --index-template svgrIndexTemplate.js \
  --typescript \
  --no-dimensions \
  --replace-attr-values "#fff={props.color || '#fff'}" \
  --out-dir svgrComponents \
  -- originalSvgs;

echo "Copying (force) all generated components to $destination_svg_components"
cp -rf "$source_svg_components"/* "$destination_svg_components"
find $source_svg_components -name "*.tsx" -type f -delete
find $source_svg_components -name "*.ts" -type f -delete

echo "Copying (force) all original provided svgs to $destination_original_svgs"
cp -rf "$original_svgs_input"/* "$destination_original_svgs"
find $original_svgs_input -name "*.svg" -type f -delete