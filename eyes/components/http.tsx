import { FC } from "react";
import { Segment, Label, List, Header, Message, SemanticCOLORS } from "semantic-ui-react";

const colorMapping = {
  GET: "green" as SemanticCOLORS,
  POST: "orange" as SemanticCOLORS,
  UPDATE: "teal" as SemanticCOLORS,
  DELETE: "red" as SemanticCOLORS,
  PUT: "violet" as SemanticCOLORS,
};

interface HttpProps {
  value: string;
}

const Http: FC<HttpProps> = ({ children, value }) => {
  const statusColor = (status: number) => {
    switch (true) {
      case status < 200:
        return "olive" as SemanticCOLORS;
      case status < 300:
        return "green" as SemanticCOLORS;
      case status < 400:
        return "teal" as SemanticCOLORS;
      case status < 500:
        return "red" as SemanticCOLORS;
      default:
        return "grey" as SemanticCOLORS;
    }
  };

  const groups = /([A-Z]+) (\/[\w\.\/-]*) (\d+) (\{.*\}) (\d+|-) ([\d\.]+ ms)/g.exec(
    value
  );
  if (!groups) console.log(value);
  const { method, route, status, body, length, time } = {
    method: groups[1] || "undefined",
    route: groups[2] || "unknown",
    status: groups[3] || "404",
    body: groups[4] || "{}",
    length: groups[5] || 0,
    time: groups[6] || "0 ms",
  };
  return (
    <div>
      <Segment attached raised textAlign="left">
        <Label ribbon color={colorMapping[method]}>
          {method}
        </Label>
        <Label floated="right" as="a" color={statusColor(+status)}>
          {status}
          <Label.Detail>{time}</Label.Detail>
        </Label>
        <Header as="h2">{route}</Header>
      </Segment>
      {body != "{}" ? (
        <Message info attached="bottom">
          <Message.Header>RequestBody</Message.Header>
          <List.Item>
            <List.Content floated="right">{body}</List.Content>
          </List.Item>
        </Message>
      ) : null}
    </div>
  );
};

export default Http;
