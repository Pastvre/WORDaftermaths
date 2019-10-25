
.PHONY: all clean

all:
	build/build_index.sh
	git add index/*
	git commit -m "Regenerated index files."

clean:
	rm index/*.html

