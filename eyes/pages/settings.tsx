import {
  Container,
  Header,
  Divider,
  Segment,
  Message,
  Icon,
  Input,
} from "semantic-ui-react";
import Page, { Logging } from "../components";
import { useState } from "react";

export default function Setting() {
  const [address, setAddress] = useState(""); // useHttpClient

  return (
    <Page>
      <Header as="h1">
        Einstellungen
        <Header.Subheader>
          Logging, Verwaltung von IP-Adressen und Informationen zur Software
        </Header.Subheader>
      </Header>
      <Segment vertical>
        <Container fluid id="log">
          <Header as="h3">Logging</Header>
          <Logging></Logging>
        </Container>
      </Segment>
      <Segment vertical>
        <Container fluid id="address">
          <Header as="h3">Adressen</Header>
          <Divider horizontal>
            <Header as="h4">
              <Icon name="microchip" />
              Lightmanager-Adresse
            </Header>
          </Divider>
          <Input
            fluid
            action={{
              color: "teal",
              labelPosition: "right",
              icon: "angle double right",
              content: "Ändern",
              onClick: (e, { value }) => setAddress(value),
            }}
            type="text"
            size="large"
            value={address}
            onChange={(e, { value }) => setAddress(value)}
            placeholder="http://lightmanager/params.json"
          />
        </Container>
      </Segment>
      <Segment vertical>
        <Divider hidden />
        <Container fluid id="version">
          <Header as="h3">Version</Header>
          <Message info>
            <Message.Header>
              <Icon name="info" />
              0.0.9
            </Message.Header>
          </Message>
        </Container>
      </Segment>
    </Page>
  );
}
