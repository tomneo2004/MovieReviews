import Box from "@material-ui/core/Box/Box";
import React from "react";

type SectionHeaderProps = React.ComponentProps<typeof Box> & {
  header: React.ReactNode;
  headerAlign?: "left" | "center" | "right";
  items?: React.ReactNode[];
};

/**
 * Component SectionHeader
 *
 * Adjustable header alignment
 *
 * Adjustable background color
 *
 * With items
 *
 * @param {SectionHeaderProps} props
 */
const SectionHeader: React.FC<SectionHeaderProps> = (
  props: SectionHeaderProps
) => {
  const { header, headerAlign = "left", items = [], ...rest } = props;

  const headerOrder =
    headerAlign === "left" || headerAlign === "center" ? 0 : 1;
  const itemsOrder = headerOrder === 0 ? headerOrder + 1 : 0;
  const flexDir = headerAlign === "center" ? "column" : "row";
  const alignItems = flexDir === "column" ? "center" : "";
  const itemsJC =
    headerAlign === "right"
      ? "flex-end"
      : headerAlign === "left"
      ? "flex-start"
      : "center";
  const py = headerAlign === "center" && items && items.length > 0 ? 1 : 0;

  return (
    <Box {...rest}>
      <Box
        display="flex"
        flexDirection={flexDir}
        alignItems={alignItems}
        py={py}
      >
        <Box
          flex="initial"
          order={headerOrder}
          pb={py}
          justifyContent="center"
          alignItems="center"
        >
          {header}
        </Box>
        <Box
          flex="auto"
          order={itemsOrder}
          display="flex"
          justifyContent={itemsJC}
          px={1}
        >
          {items.map((item, i) => {
            return <React.Fragment key={i}>{item}</React.Fragment>;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default SectionHeader;
