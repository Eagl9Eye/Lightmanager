import {
  Container,
  Header,
  Divider,
  Segment,
  Message,
  Icon,
  Input,
  Accordion,
} from "semantic-ui-react";
import Page from "../components";
import { ResponseBody } from "../types";

const testZone: ResponseBody.Configuration = {
  zones: [
    {
      id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6e",
      name: "Wohnzimmer",
      actuators: [
        {
          id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          name: "Neonleuchte",
          commands: [
            {
              address: "http://192.127.23.234:8000/cmnd=on",
              method: "get",
              type: "on",
            },
          ],
          status: 1,
        },
      ],
    },
  ],
};

export default function Setting() {
  return (
    <Page>
      <Header as="h1">
        Zonen Verwalten
        <Header.Subheader>
          In der Zonenverwaltung lassen sich die Namen der Zonen und die Aktoren in den
          Zonen anpassen. Dazu gehört das Hinzufügen, Ändern und Löschen von Geräten und
          Zonen.
        </Header.Subheader>
      </Header>
      <Segment vertical>
        <Container fluid>
          <Accordion
            fluid
            styled
            panels={testZone.zones.map((zone) => ({
              key: zone.id,
              title: { content: zone.name },
              content: {
                content: (
                  <Accordion
                    styled
                    panels={zone.actuators.map((actuator) => ({
                      key: actuator.id,
                      title: { content: actuator.name },
                      content: {
                        content: (
                          <Accordion
                            styled
                            panels={actuator.commands.map((command, i) => ({
                              key: i,
                              title: { content: command.type },
                              content: { content: <p>{command.address}</p> },
                            }))}
                          />
                        ),
                      },
                    }))}
                  />
                ),
              },
            }))}
          />
        </Container>
      </Segment>
    </Page>
  );
}
