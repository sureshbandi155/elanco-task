import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import _ from "lodash";

import {
  Button,
  Dimmer,
  Dropdown,
  Form,
  Header,
  Icon,
  Loader,
  Segment,
  Table,
} from "semantic-ui-react";

interface Options {
  key: string;
  text: string;
  value: string;
}

interface Data {
  ConsumedQuantity: string;
  Cost: string;
  Date: string;
  InstanceId: string;
  MeterCategory: string;
  ResourceGroup: string;
  ResourceLocation: string;
  UnitOfMeasure: string;
  Location: string;
  ServiceName: string;
}

export const Resources: React.FC = () => {
  const [resourcesName, setResourcesName] = useState("");
  const [resOptions, setResOptions] = useState<Options[]>([]);
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_API}/resources`)
      .then((res) => {
        setResOptions(
          res?.data?.map((item: string) => {
            return {
              key: item,
              text: item,
              value: item,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e: any) => {
    setLoading(true);
    setData([]);
    if (resourcesName.length) {
      axios
        .get(`${process.env.REACT_APP_BASE_API}/resources/${resourcesName}`)
        .then((res) => {
          setData(res?.data?.map((item: any) => item));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setData([]);
    }
  };

  const handleDataChange = (e: any, data: any) => {
    setResourcesName(data.value);
  };

  const handleClear = () => {
    setResourcesName("");
    setData([]);
  };

  const sortReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE_SORT":
        if (state.column === action.column) {
          return {
            ...state,
            data: state.data.slice().reverse(),
            direction:
              state.direction === "ascending" ? "descending" : "ascending",
          };
        }

        return {
          column: action.column,
          data: _.sortBy(state.data, [action.column]),
          direction: "ascending",
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(sortReducer, {
    column: null,
    data: data,
    direction: null,
  });

  return (
    <>
      <Header as="h2" content="Resources" />
      <Segment>
        <Header as="h3" content="Search" />
        <Form>
          <Form.Group>
            <Form.Field width={4}>
              <label>Resources</label>
              <Dropdown
                placeholder="Select"
                search
                selection
                options={resOptions}
                name="Resources"
                value={resourcesName}
                onChange={(e, data) => handleDataChange(e, data)}
              />
            </Form.Field>
          </Form.Group>
          <Button content="Search" primary onClick={handleSearch} />
          <Button
            content="Clear Search"
            basic
            color="blue"
            onClick={handleClear}
          />
        </Form>
        <hr />
        <Dimmer active={loading} inverted>
          <Loader size="medium">Loading</Loader>
        </Dimmer>
        <div className="tableContainer">
          <Table compact singleLine striped sortable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={
                    state.column === "ConsumedQuantity" ? state.direction : null
                  }
                  onClick={() =>
                    dispatch({
                      type: "CHANGE_SORT",
                      column: "ConsumedQuantity",
                    })
                  }
                >
                  Consumed Quantity
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={state.column === "Cost" ? state.direction : null}
                  onClick={() =>
                    dispatch({
                      type: "CHANGE_SORT",
                      column: "Cost",
                    })
                  }
                >
                  Cost
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={state.column === "Date" ? state.direction : null}
                  onClick={() =>
                    dispatch({
                      type: "CHANGE_SORT",
                      column: "Date",
                    })
                  }
                >
                  Date
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={
                    state.column === "InstanceId" ? state.direction : null
                  }
                  onClick={() =>
                    dispatch({
                      type: "CHANGE_SORT",
                      column: "InstanceId",
                    })
                  }
                >
                  Instance Id
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={
                    state.column === "MeterCategory" ? state.direction : null
                  }
                  onClick={() =>
                    dispatch({
                      type: "CHANGE_SORT",
                      column: "MeterCategory",
                    })
                  }
                >
                  Meter Category
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={
                    state.column === "ResourceGroup" ? state.direction : null
                  }
                  onClick={() =>
                    dispatch({
                      type: "CHANGE_SORT",
                      column: "ResourceGroup",
                    })
                  }
                >
                  Resource Group
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={
                    state.column === "ResourceLocation" ? state.direction : null
                  }
                  onClick={() =>
                    dispatch({
                      type: "CHANGE_SORT",
                      column: "ResourceLocation",
                    })
                  }
                >
                  Resource Location
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={
                    state.column === "UnitOfMeasure" ? state.direction : null
                  }
                  onClick={() =>
                    dispatch({
                      type: "CHANGE_SORT",
                      column: "UnitOfMeasure",
                    })
                  }
                >
                  Unit Of Measure
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={state.column === "Location" ? state.direction : null}
                  onClick={() =>
                    dispatch({
                      type: "CHANGE_SORT",
                      column: "Location",
                    })
                  }
                >
                  Location
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={
                    state.column === "ServiceName" ? state.direction : null
                  }
                  onClick={() =>
                    dispatch({
                      type: "CHANGE_SORT",
                      column: "ServiceName",
                    })
                  }
                >
                  Service Name
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body className={`${data.length ? "" : "noDataText"}`}>
              {data.length ? (
                data?.map((item: any, i: number) => (
                  <Table.Row key={i}>
                    <Table.Cell>{item.ConsumedQuantity}</Table.Cell>
                    <Table.Cell>{item.Cost}</Table.Cell>
                    <Table.Cell>{item.Date}</Table.Cell>
                    <Table.Cell>{item.InstanceId}</Table.Cell>
                    <Table.Cell>{item.MeterCategory}</Table.Cell>
                    <Table.Cell>{item.ResourceGroup}</Table.Cell>
                    <Table.Cell>{item.ResourceLocation}</Table.Cell>
                    <Table.Cell>{item.UnitOfMeasure}</Table.Cell>
                    <Table.Cell>{item.Location}</Table.Cell>
                    <Table.Cell>{item.ServiceName}</Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell className="center aligned" colspan="10">
                    <div className="noDataRow">
                      <div className="icon">
                        <Icon name="search" />
                      </div>
                      Search to view resources
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </Segment>
    </>
  );
};
