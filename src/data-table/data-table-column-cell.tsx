import { format } from "date-fns"

interface DataTableColumnCellProps {
  data: string | Date | number | undefined
  type: "text" | "date" | "integer" | "decimal"
}

const DataTableColumnCell = ({ data, type }: DataTableColumnCellProps) => {
  if (!data) return data

  let formatedValue

  switch (type) {
    case "text":
      formatedValue = data
      break
    case "date":
      formatedValue = format(new Date(data), "P")
      break
    case "integer":
      formatedValue = Number(data)
      break
    case "decimal":
      formatedValue = Number(data).toFixed(2)
      break
  }

  return formatedValue.toString()
}

export default DataTableColumnCell
