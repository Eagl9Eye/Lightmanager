import {
  Image,
  Container,
  Header,
  Divider,
  Segment,
  Menu,
  Dropdown,
  Icon,
} from "semantic-ui-react";
import Page from "../components";

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
          <Menu attached="top">
            <Dropdown item icon="wrench" simple>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Icon name="dropdown" />
                  <span className="text">New</span>

                  <Dropdown.Menu>
                    <Dropdown.Item>Document</Dropdown.Item>
                    <Dropdown.Item>Image</Dropdown.Item>
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

            <Menu.Menu position="right">
              <div className="ui right aligned category search item">
                <div className="ui transparent icon input">
                  <input className="prompt" type="text" placeholder="Search animals..." />
                  <i className="search link icon" />
                </div>
                <div className="results" />
              </div>
            </Menu.Menu>
          </Menu>
          <Segment attached="bottom" secondary style={{ height: 200 }}>
            Log Einträge
          </Segment>
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
