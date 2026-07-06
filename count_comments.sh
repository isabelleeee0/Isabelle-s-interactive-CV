#!/bin/bash

REPORT_FILE="Isabelle_bash_report.txt"
PATTERN="NEW:"

echo "=== Comment Analysis Report ===" > $REPORT_FILE
echo "Date: $(date)" >> $REPORT_FILE
echo "-------------------------------" >> $REPORT_FILE

total_count=0

# Iterate through specified file types
for file in *.html *.css *.js; do
    # Check if the file exists to avoid errors on empty folders
    if [ -f "$file" ]; then
        # Count lines containing the pattern
        count=$(grep -c "$PATTERN" "$file")
        
        # Log to file and terminal
        echo "$file: $count" >> $REPORT_FILE
        echo "$file: $count"
        
        # Accumulate the total
        total_count=$((total_count + count))
    fi
done

# Finalize the report
echo "-------------------------------" >> $REPORT_FILE
echo "Total count across all files: $total_count" >> $REPORT_FILE
echo "-------------------------------"

echo ""
echo "Total identified: $total_count"