import { List, Icon, Button, Header, Segment, Container } from "semantic-ui-react";
import Page from "../components";
import { ResponseBody } from "../types";

const testParameter: ResponseBody.Parameter = {
  Marker0: 0,
  Marker1: 0,
  Marker2: 0,
  Marker3: 0,
  Marker4: 0,
  Marker5: 0,
  Marker6: 0,
  Marker7: 0,
  Marker8: 1,
  Marker9: 1,
  Marker10: 0,
  Marker11: 0,
  Marker12: 0,
  Marker13: 0,
  Marker14: 0,
  Marker15: 0,
  Marker16: 0,
  Marker17: 1,
  Marker18: 0,
  Marker19: 0,
  Marker20: 0,
  Marker21: 1,
  Marker22: 1,
  Marker23: 1,
  Marker24: 1,
  Marker25: 1,
  Marker26: 0,
  Marker27: 0,
  Marker28: 1,
  Marker29: 1,
  Marker30: 1,
  Marker31: 1,
  Marker32: 1,
  Marker33: 1,
  Marker34: 0,
  Marker35: 0,
  Marker36: 0,
  Marker37: 0,
  Marker38: 0,
  Marker39: 0,
  Marker40: 0,
  Marker41: 0,
  Marker42: 0,
  Marker43: 0,
  Marker44: 0,
  Marker45: 0,
  Marker46: 0,
  Marker47: 0,
  Marker48: 0,
  Marker49: 0,
  Marker50: 0,
  Marker51: 0,
  Marker52: 0,
  Marker53: 0,
  Marker54: 0,
  Marker55: 0,
  Marker56: 0,
  Marker57: 0,
  Marker58: 0,
  Marker59: 0,
  Marker60: 0,
  Marker61: 0,
  Marker62: 0,
  Marker63: 0,
};

export default function Setting() {
  // marker bekommen
  // markernamen aendern
  // marker status umschalten
  return (
    <Page>
      <Header as="h1">
        Marker Anzeigen
        <Header.Subheader>Marker-Name, -Status anzeigen und verändern</Header.Subheader>
      </Header>
      <Segment vertical>
        <Container fluid>
          <List animated size="big" divided verticalAlign="middle">
            {Object.keys(testParameter).map((key) => (
              <List.Item key={key}>
                <Button
                  color="blue"
                  icon="edit"
                  labelPosition="left"
                  floated="right"
                  content="Umbennenen"
                />
                <Button
                  floated="right"
                  animated="fade"
                  positive={testParameter[key] === 0}
                  negative={testParameter[key] === 1}
                >
                  <Button.Content visible>{testParameter[key]}</Button.Content>
                  <Button.Content hidden>
                    <Icon name="sync alternate" />
                  </Button.Content>
                </Button>
                <List.Content>
                  <List.Header>{key}</List.Header>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Container>
      </Segment>
    </Page>
  );
}
