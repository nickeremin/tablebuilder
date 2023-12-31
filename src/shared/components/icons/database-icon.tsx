import Icon, { type IIconProps } from "./icon"

function DatabaseIcon(props: IIconProps) {
  return (
    <Icon
      sourceSvgHeight={24}
      sourceSvgWidth={24}
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </Icon>
  )
}

export default DatabaseIcon
