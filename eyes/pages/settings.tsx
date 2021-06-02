import { Image, Container, Header, Divider, Segment } from "semantic-ui-react";
import Page, { Logging } from "../components";

export default function Home() {
  return (
    <Page>
      <Header as="h2">
        Einstellungen
        <Header.Subheader>
          Logging, Verwaltung von IP-Adressen und Informationen zur Software
        </Header.Subheader>
      </Header>
      <Segment vertical>
        <Container text id="log">
          <Header as="h3">Logging</Header>
          <Logging></Logging>
        </Container>
      </Segment>
      <Segment vertical>
        <Divider hidden />
        <Container text id="address">
          <Header as="h3">Adressen</Header>
          <Image
            src="/bedroom-clipart-md.png"
            size="medium"
            style={{ marginTop: "2em" }}
          />
        </Container>
      </Segment>
      <Segment vertical>
        <Divider hidden />
        <Container text id="version">
          <Header as="h2">Version</Header>
        </Container>
      </Segment>
    </Page>
  );
}
