import {
  DetailedHTMLProps,
  Dispatch,
  forwardRef,
  HTMLAttributes,
  MutableRefObject,
  Ref,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Column, useRowSelect, useTable } from "react-table";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  columns: readonly Column<{}>[];
  data: readonly {}[];
  setSelectedItems?: Dispatch<SetStateAction<any[]>>;
  noCheckbox?: boolean;
  fontSize?: "text-xs" | "text-sm" | "text-md" | "text-lg" | "text-xl";
  minH?: string;
}

interface IIndeterminateInputProps {
  indeterminate?: boolean;
  name: string;
}
const useCombinedRefs = (...refs): MutableRefObject<any> => {
  const targetRef = useRef();

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  IIndeterminateInputProps
>(({ indeterminate, ...rest }, ref: Ref<HTMLInputElement>) => {
  const defaultRef = useRef(null);
  const combinedRef = useCombinedRefs(ref, defaultRef);

  useEffect(() => {
    if (combinedRef?.current) {
      combinedRef.current.indeterminate = indeterminate ?? false;
    }
  }, [combinedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={combinedRef} {...rest} />
    </>
  );
});

const StyledTable = ({
  columns,
  data,
  setSelectedItems,
  noCheckbox = false,
  fontSize = "text-sm",
  children,
  minH = "50rem",
  ...props
}: Props) => {
  const tableInstance = noCheckbox
    ? useTable({ columns, data })
    : useTable({ columns, data }, useRowSelect, (hooks) => {
        hooks.visibleColumns.push((columns) => [
          // Let's make a column for selection
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }: any) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }: any) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = tableInstance;

  useEffect(() => {
    if (selectedFlatRows) {
      setSelectedItems(selectedFlatRows.map((d: any) => d.original.id));
    }
    return () => {
      if (selectedFlatRows) setSelectedItems([]);
    };
  }, [selectedFlatRows]);

  let isPullOutForm = false;
  for(const column of columns){
    if (column.Header === "Description") isPullOutForm = true
  }

  return (
    <div
      {...props}
      style={{ minHeight: minH }}
      className="flex flex-col  bg-white rounded-lg p-4 overflow-x-auto "
    >
      <table
        className="w-full border-0 h-full bg-white rounded-lg table-auto"
        {...getTableProps()}
      >
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr className="" {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th
                      className={`text-left px-6 py-3 ${fontSize} text-gray-500 font-medium`}
                      {...column.getHeaderProps()}
                    >
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr className="" {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td
                          className={`border-t border-gray-100 ${fontSize} py-6 px-6`}
                          {...cell.getCellProps()}
                        >
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
      {children}
    </div>
  );
};

export default StyledTable;
