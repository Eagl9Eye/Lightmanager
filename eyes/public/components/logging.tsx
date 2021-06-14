import {
  Menu,
  Dropdown,
  Icon,
  Segment,
  Input,
  Grid,
  Label,
  Message,
} from "semantic-ui-react";
import { FC, useEffect, useState } from "react";
import { getAllEnumKeys } from "../util/enum";

enum Level {
  Error = "Error",
  Warn = "Warn",
  Info = "Info",
  Http = "Http",
  Verbose = "Verbose",
  Debug = "Debug",
  Silly = "Silly",
}
type LevelType = keyof typeof Level;

interface LoggingProps {
  initialFilter?: LevelType[];
}

const Page: FC<LoggingProps> = ({
  initialFilter = [Level.Warn, Level.Http, Level.Info],
}) => {
  const [filter, updateFilter] = useState(initialFilter);
  const removeFilter = (item) => {
    updateFilter(filter.filter((level) => level !== item));
  };
  const addFilter = (item) => {
    filter.push(item);
  };
  useEffect(() => {}, [filter]);
  return (
    <div>
      <Menu attached="top">
        <Dropdown item icon="wrench" simple>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Icon name="dropdown" />
              <span className="text">Filter</span>

              <Dropdown.Menu>
                {getAllEnumKeys(Level).map((level) => (
                  <Dropdown.Item onClick={(e, { level }) => addFilter(level)}>
                    {level}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>Open</Dropdown.Item>
            <Dropdown.Item>Save...</Dropdown.Item>
            <Dropdown.Item>Edit Permissions</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Export</Dropdown.Header>
            <Dropdown.Item>Share</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item>
          <Label.Group color="blue">
            {filter.map((item) => (
              <Label onClick={(e, { level }) => removeFilter(level)}>
                {item}
                <Icon as="a" name="close" />
              </Label>
            ))}
          </Label.Group>
        </Menu.Item>
        <Menu.Item position="right">
          <Input placeholder="Search..." action={{ type: "submit", content: "Go" }} />
        </Menu.Item>
      </Menu>
      <Segment attached="bottom" secondary style={{ height: 200 }}>
        <Grid columns="equal" divided="vertically">
          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              <Label color="red" horizontal ribbon>
                Error
              </Label>
            </Grid.Column>
            <Grid.Column width={11}>
              <Message info>
                <Message.Header>12 Years a Slave</Message.Header>
              </Message>
            </Grid.Column>
            <Grid.Column width={4} floated="right">
              19.23.2021 15:34
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Label color="green" horizontal>
                Info
              </Label>
            </Grid.Column>
            <Grid.Column width={10}>Eine Nachricht</Grid.Column>
            <Grid.Column width={4} floated="right">
              19.23.2021 15:34
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};
export default Page;
