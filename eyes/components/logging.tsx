import {
  Menu,
  Dropdown,
  Icon,
  Segment,
  Input,
  Label,
  Table,
  SemanticCOLORS,
} from "semantic-ui-react";
import { FC, useState } from "react";
import { getAllEnumKeys } from "../util/enum";
import dateFormat from "dateformat";
import useLog from "../util/useLog";
import { Level, LoggingResponse, LevelType } from "../types/log";
import Http from "./http";

const colorMapping = {
  error: "red" as SemanticCOLORS,
  warn: "orange" as SemanticCOLORS,
  info: "olive" as SemanticCOLORS,
  http: "green" as SemanticCOLORS,
  verbose: "grey" as SemanticCOLORS,
  debug: "blue" as SemanticCOLORS,
  silly: "purple" as SemanticCOLORS,
};

interface LoggingProps {
  initialFilter?: LevelType[];
}

const Page: FC<LoggingProps> = ({ initialFilter = ["warn", "http", "info"] }) => {
  const { messages } = useLog();
  const [filter, setFilter] = useState(initialFilter);
  const [sorter, setSorter] = useState<"DESC" | "ASC">("DESC");
  /*const [link, setLink] = useState("");
  const makeDumpFile = () => {
    const data = new File([JSON.stringify(lines)], "Log.dmp", { type: "text/plain" });
    if (link !== "") window.URL.revokeObjectURL(link);
    setLink(window.URL.createObjectURL(data));
  };*/

  const removeFilter = (item: LevelType) => {
    setFilter(filter.filter((level) => level !== item));
  };

  const addFilter = (level: LevelType) => {
    setFilter(filter.find((item) => item === level) ? filter : [...filter, level]);
  };

  return (
    <div>
      <Menu attached="top">
        <Dropdown item icon="filter" labeled simple>
          <Dropdown.Menu>
            <Dropdown.Header icon="tags" content="Typen" />
            <Dropdown.Divider />
            {getAllEnumKeys(Level).map((level) => (
              <Dropdown.Item
                key={level}
                level={level}
                value={level}
                text={level}
                label={{ empty: true, color: colorMapping[level], circular: true }}
                onClick={(e, data) => addFilter(data.level)}
              />
            ))}
            <Dropdown.Divider />
            <Dropdown.Item>Download</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item fitted="vertically">
          <Label.Group color="blue">
            {filter.map((level) => (
              <Label
                as="a"
                key={level}
                level={level}
                onClick={(e, data) => removeFilter(data.level)}
              >
                {level}
                <Icon name="close" />
              </Label>
            ))}
          </Label.Group>
        </Menu.Item>
        <Menu.Item position="right">
          <Input placeholder="Suchen..." action={{ type: "submit", content: "Los" }} />
        </Menu.Item>
      </Menu>
      <Segment
        attached="bottom"
        secondary
        style={{ overflow: "scroll", overflowX: "hidden", height: 500 }}
      >
        <Table basic="very" sortable padded striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Typ</Table.HeaderCell>
              <Table.HeaderCell>Beschreibung</Table.HeaderCell>
              <Table.HeaderCell
                sorted={sorter === "DESC" ? "descending" : "ascending"}
                onClick={() => setSorter(sorter === "DESC" ? "ASC" : "DESC")}
              >
                Zeitpunkt
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {messages
              .filter((line: LoggingResponse) => filter.includes(line.level))
              .sort((a, b) =>
                sorter === "DESC"
                  ? Date.parse(b.timestamp) - Date.parse(a.timestamp)
                  : Date.parse(a.timestamp) - Date.parse(b.timestamp)
              )
              .map((line: LoggingResponse, i: number) => {
                return (
                  <Table.Row key={i}>
                    <Table.Cell collapsing textAlign="left">
                      <Label color={colorMapping[line.level]}>{line.level}</Label>
                    </Table.Cell>
                    <Table.Cell className={"preWrap"}>
                      {line.level === "http" ? (
                        <Http value={line.message} />
                      ) : (
                        line.message
                      )}
                    </Table.Cell>
                    <Table.Cell collapsing textAlign="right">
                      {dateFormat(line.timestamp, "H:MM:ss, dddd, mmmm dS")}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </Segment>
    </div>
  );
};
export default Page;
