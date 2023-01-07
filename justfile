# just manual: https://github.com/casey/just/#readme

_default:
    @just --list

# Create a zip file for upload
zip:
    zip -r -FS ../reading_time.zip * --exclude '*.git*' justfile
