#!/bin/bash

pushd $(git rev-parse --show-toplevel)

LOGS_PATH='logs/'
INDEX_PATH='index/'
TEMPLATE_PATH='build/index_template.html'
LOGS_PATH_LEN=$(echo "$LOGS_PATH" | wc -c)
ENTRY_ID_LEN=4

for file in ${LOGS_PATH}*
do
    ENTRY_ID="${file:$(expr $LOGS_PATH_LEN - 1):$ENTRY_ID_LEN}"
    ENTRY_NUMBER=$(echo $ENTRY_ID | sed 's/^0*//')
    ENTRY_OUT="${INDEX_PATH}${ENTRY_ID}.html"
    echo '' >$ENTRY_OUT
    cat $TEMPLATE_PATH | sed "s/%%ENTRY_NUMBER%%/$ENTRY_NUMBER/" | sed "s/%%ENTRY_ID%%/$ENTRY_ID/" >>$ENTRY_OUT
done

# ENTRY_OUT="index.html"
# rm $ENTRY_OUT 2>/dev/null
# for file in ${INDEX_PATH}*
# do
#     ENTRY_ID="${file:$(expr $LOGS_PATH_LEN - 1):$ENTRY_ID_LEN}"
#     ENTRY_NUMBER=$(echo $ENTRY_ID | sed 's/^0*//')
#     echo "<a href='$file'>$file</a>" >>$ENTRY_OUT
# done
