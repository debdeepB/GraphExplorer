import React, { Component } from "react";
import { DataSet, Network } from "vis/index-network";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";

import "vis/dist/vis-network.min.css";

class Hypothesis extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params }
    } = props;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddHypothesis = this.handleAddHypothesis.bind(this);

    this.state = {
      datasetId: params.datasetId,
      nodes: [],
      edges: [],
      dataset: [],
      network: {},
      search: "",
      clicked: [],
      hypothesis: [
        {
          directed: false,
          links: [
            {
              source: 0,
              target: 1,
              key: 0,
              edge_relation: "Demonstrator-Conflict_Demonstrate"
            },
            {
              source: 0,
              target: 2,
              key: 0,
              edge_relation: "Place-Conflict_Demonstrate"
            },
            {
              source: 0,
              target: 3,
              key: 0,
              edge_relation: "Time-Conflict_Demonstrate"
            },
            {
              source: 0,
              target: 4,
              key: 0,
              edge_relation: "Place-Conflict_Demonstrate"
            },
            {
              source: 0,
              target: 5,
              key: 0,
              edge_relation: "Place-Conflict_Demonstrate"
            },
            {
              source: 0,
              target: 5,
              key: 1,
              edge_relation: "Place-Conflict_Demonstrate"
            },
            {
              source: 0,
              target: 6,
              key: 0,
              edge_relation: "Place-Conflict_Demonstrate"
            }
          ],
          multigraph: true,
          graph: {},
          meta_data: {
            scores: [
              ["scorer_li", 0.0],
              ["scorer_nd", 0.046146161147070666],
              ["scorer_ei", 0.13551351300350706],
              ["scorer_nc", 0.0745102599328405],
              ["scorer_er", 0.0],
              ["scorer_ps", 0.07095500661777422],
              ["scorer_eec", 0.05252868028144101],
              ["scorer_qer", 0.0],
              ["scorer_hs", 0.07503494149403435],
              ["scorer_x", 0.00734624651498322]
            ]
          },
          nodes: [
            {
              node_cluster_id: "7637e63b-eeb6-4a5b-871b-1057dc34d0c1-prototype",
              node_id: "7637e63b-eeb6-4a5b-871b-1057dc34d0c1",
              is_mention_id: true,
              id: 0,
              node_text: ""
            },
            {
              node_cluster_id: "a7bcf2b8-0afc-4e99-bbba-658daf22b281-prototype",
              node_id: "a7bcf2b8-0afc-4e99-bbba-658daf22b281",
              is_mention_id: false,
              id: 1,
              node_text: "guard"
            },
            {
              node_cluster_id: "d5cbf475-468f-4713-8cee-f7231318b52a-prototype",
              node_id: "76d894b2-7a98-40ba-aef3-394c53f6f2a2",
              is_mention_id: false,
              id: 2,
              node_text: "#Sloviansk:"
            },
            {
              node_cluster_id: "47ae66d0-aa60-44e2-9985-e74f8439ecf4-prototype",
              node_id: "47ae66d0-aa60-44e2-9985-e74f8439ecf4",
              is_mention_id: false,
              id: 3,
              node_text: "April 12, 2014"
            },
            {
              node_cluster_id: "ad485970-f880-45ad-9969-cdd4dddb943f-prototype",
              node_id: "ad485970-f880-45ad-9969-cdd4dddb943f",
              is_mention_id: false,
              id: 4,
              node_text: "here"
            },
            {
              node_cluster_id: "d5cbf475-468f-4713-8cee-f7231318b52a-prototype",
              node_id: "b88a4390-0162-4b9b-aaad-08964fe163aa",
              is_mention_id: false,
              id: 5,
              node_text: "our"
            },
            {
              node_cluster_id: "d5cbf475-468f-4713-8cee-f7231318b52a-prototype",
              node_id: "ca6df5b6-78a0-4c71-a902-c357aad73a94",
              is_mention_id: false,
              id: 6,
              node_text: "country"
            }
          ]
        },
        {
          directed: false,
          links: [
            {
              source: 0,
              target: 1,
              key: 0,
              edge_relation: "Place-Conflict_Attack"
            },
            {
              source: 0,
              target: 1,
              key: 1,
              edge_relation: "Target-Conflict_Attack"
            },
            {
              source: 0,
              target: 1,
              key: 2,
              edge_relation: "Target-Conflict_Attack"
            },
            {
              source: 0,
              target: 2,
              key: 0,
              edge_relation: "Instrument-Conflict_Attack"
            },
            {
              source: 0,
              target: 3,
              key: 0,
              edge_relation: "Attacker-Conflict_Attack"
            },
            {
              source: 0,
              target: 4,
              key: 0,
              edge_relation: "Attacker-Conflict_Attack"
            },
            {
              source: 0,
              target: 5,
              key: 0,
              edge_relation: "Attacker-Conflict_Attack"
            }
          ],
          multigraph: true,
          graph: {},
          meta_data: {
            scores: [
              ["scorer_li", 0.0],
              ["scorer_nd", 0.051616268701167416],
              ["scorer_ei", 0.21199966758217365],
              ["scorer_nc", 0.10644322847548644],
              ["scorer_er", 0.0],
              ["scorer_ps", 0.03547750330888711],
              ["scorer_eec", 0.031517208168864615],
              ["scorer_qer", 0.0],
              ["scorer_hs", 0.07503494149403435],
              ["scorer_x", 0.0070905435166413126]
            ]
          },
          nodes: [
            {
              node_cluster_id: "a6152925-29b1-4801-bab1-f71a29cc4c36-prototype",
              node_id: "205b30b8-5099-403c-979e-afed3ab365f7",
              is_mention_id: true,
              id: 0,
              node_text: ""
            },
            {
              node_cluster_id: "3c34362b-3213-4daa-83c9-2cf6df026a8a-prototype",
              node_id: "a959a5b1-8755-42f1-bbf2-2849dd10543b",
              is_mention_id: false,
              id: 1,
              node_text: "enemy"
            },
            {
              node_cluster_id: "33eed347-1fea-43c8-b4ed-12466b44ff16-prototype",
              node_id: "6981bf3b-209c-4f5a-8011-d328e22346e3",
              is_mention_id: false,
              id: 2,
              node_text: "fighters"
            },
            {
              node_cluster_id: "009a2426-52ae-4825-9c2d-b9ee49ed1b41-prototype",
              node_id: "009a2426-52ae-4825-9c2d-b9ee49ed1b41",
              is_mention_id: false,
              id: 3,
              node_text: "army"
            },
            {
              node_cluster_id: "0806b38d-ea4a-46c0-b010-c11751bb55b8-prototype",
              node_id: "0806b38d-ea4a-46c0-b010-c11751bb55b8",
              is_mention_id: false,
              id: 4,
              node_text: "six"
            },
            {
              node_cluster_id: "49ced969-079b-4a37-baf8-ec905f587fd6-prototype",
              node_id: "49ced969-079b-4a37-baf8-ec905f587fd6",
              is_mention_id: false,
              id: 5,
              node_text: "journalists"
            }
          ]
        },
        {
          directed: false,
          links: [
            {
              source: 0,
              target: 1,
              key: 0,
              edge_relation: "Broadcaster-Contact_Broadcast"
            },
            {
              source: 0,
              target: 2,
              key: 0,
              edge_relation: "Broadcaster-Contact_Broadcast"
            },
            {
              source: 0,
              target: 3,
              key: 0,
              edge_relation: "Broadcaster-Contact_Broadcast"
            },
            {
              source: 0,
              target: 4,
              key: 0,
              edge_relation: "Broadcaster-Contact_Broadcast"
            },
            {
              source: 0,
              target: 4,
              key: 1,
              edge_relation: "Broadcaster-Contact_Broadcast"
            },
            {
              source: 0,
              target: 5,
              key: 0,
              edge_relation: "Broadcaster-Contact_Broadcast"
            },
            {
              source: 0,
              target: 6,
              key: 0,
              edge_relation: "Broadcaster-Contact_Broadcast"
            },
            {
              source: 0,
              target: 7,
              key: 0,
              edge_relation: "Broadcaster-Contact_Broadcast"
            }
          ],
          multigraph: true,
          graph: {},
          meta_data: {
            scores: [
              ["scorer_li", 0.0],
              ["scorer_nd", 0.1233874613713621],
              ["scorer_ei", 0.039905819780173865],
              ["scorer_nc", 0.08515458278038912],
              ["scorer_er", 0.0],
              ["scorer_ps", 0.05321625496333066],
              ["scorer_eec", 0.04502458309837802],
              ["scorer_qer", 0.0],
              ["scorer_hs", 0.08575421885032497],
              ["scorer_x", 0.006238293183333333]
            ]
          },
          nodes: [
            {
              node_cluster_id: "6deaa678-6bbf-4a82-8f28-72ab350f6496-prototype",
              node_id: "7119de48-058e-4e16-854a-8087213864c2",
              is_mention_id: true,
              id: 0,
              node_text: ""
            },
            {
              node_cluster_id: "193dc8e4-bf97-4128-a54a-bc6b3138ea6e-prototype",
              node_id: "7e2f84e6-be84-4a14-9769-c240e271820a",
              is_mention_id: false,
              id: 1,
              node_text:
                "\u0421\u043b\u0443\u0436\u0431\u043e\u044e \u0411\u0435\u0437\u043f\u0435\u043a\u0438 \u0423\u043a\u0440\u0430\u0457\u043d\u0438"
            },
            {
              node_cluster_id: "94341d13-aa81-4d4b-85ae-05aa0bfecfc1-prototype",
              node_id: "94341d13-aa81-4d4b-85ae-05aa0bfecfc1",
              is_mention_id: false,
              id: 2,
              node_text:
                "\u0442\u0435\u043b\u0435\u0431\u0430\u0447\u0435\u043d\u043d\u044f"
            },
            {
              node_cluster_id: "78c68d37-74f2-4f7f-bd96-bba3680388c5-prototype",
              node_id: "78c68d37-74f2-4f7f-bd96-bba3680388c5",
              is_mention_id: false,
              id: 3,
              node_text:
                "\u042f\u0441\u043d\u043e\u0433\u043e\u0440\u043e\u0432\u043a\u0430"
            },
            {
              node_cluster_id: "3c34362b-3213-4daa-83c9-2cf6df026a8a-prototype",
              node_id: "df0348c3-398e-4612-a8fc-56c5f7370b13",
              is_mention_id: false,
              id: 4,
              node_text:
                "\u041a\u0440\u0430\u043c\u0430\u0442\u043e\u0440\u0441\u044c\u043a"
            },
            {
              node_cluster_id: "d5cbf475-468f-4713-8cee-f7231318b52a-prototype",
              node_id: "f9e172cc-fed7-45ce-91a4-41ef1f61f4a6",
              is_mention_id: false,
              id: 5,
              node_text:
                "\u0440\u043e\u0441\u0456\u0439\u0441\u044c\u043a\u0438\u0445"
            },
            {
              node_cluster_id: "d5cbf475-468f-4713-8cee-f7231318b52a-prototype",
              node_id: "02896237-ed7e-468b-a119-f5e379e50d83",
              is_mention_id: false,
              id: 6,
              node_text:
                "\u0440\u043e\u0441\u0456\u0439\u0441\u044c\u043a\u0438\u043c\u0438"
            },
            {
              node_cluster_id: "0e8f8dce-49c7-4f61-9726-0b362d9f9ed5-prototype",
              node_id: "97c987f0-0457-455c-823c-469ca0a90705",
              is_mention_id: false,
              id: 7,
              node_text:
                "\u041a\u043e\u043d\u0446\u0435\u0440\u043d \u0440\u0430\u0434\u0456\u043e\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f"
            }
          ]
        },
        {
          directed: false,
          links: [
            {
              source: 0,
              target: 1,
              key: 0,
              edge_relation: "Place-Conflict_Attack"
            },
            {
              source: 0,
              target: 1,
              key: 1,
              edge_relation: "Place-Conflict_Attack"
            },
            {
              source: 1,
              target: 2,
              key: 0,
              edge_relation: "Time-Conflict_Attack"
            },
            {
              source: 1,
              target: 3,
              key: 0,
              edge_relation: "Place-Conflict_Attack"
            },
            {
              source: 1,
              target: 4,
              key: 0,
              edge_relation: "Time-Conflict_Attack"
            },
            {
              source: 1,
              target: 5,
              key: 0,
              edge_relation: "Target-Conflict_Attack"
            }
          ],
          multigraph: true,
          graph: {},
          meta_data: {
            scores: [
              ["scorer_li", 0.0],
              ["scorer_nd", 0.07897289111278613],
              ["scorer_ei", 0.15796053662985488],
              ["scorer_nc", 0.06386593708529185],
              ["scorer_er", 0.0],
              ["scorer_ps", 0.05321625496333066],
              ["scorer_eec", 0.02701474985902681],
              ["scorer_qer", 0.0],
              ["scorer_hs", 0.06431566413774373],
              ["scorer_x", 0.006022502256321196]
            ]
          },
          nodes: [
            {
              node_cluster_id: "3c34362b-3213-4daa-83c9-2cf6df026a8a-prototype",
              node_id: "f3eebd9f-d4e7-4ae3-9381-0147a8ba15e4",
              is_mention_id: false,
              id: 0,
              node_text: "Kramatorsk"
            },
            {
              node_cluster_id: "a280f060-66ea-47fd-82fd-8b12d14f3621-prototype",
              node_id: "a280f060-66ea-47fd-82fd-8b12d14f3621",
              is_mention_id: true,
              id: 1,
              node_text: ""
            },
            {
              node_cluster_id: "c4eb0d6f-12c7-45cf-ae81-78210f7804c0-prototype",
              node_id: "c4eb0d6f-12c7-45cf-ae81-78210f7804c0",
              is_mention_id: false,
              id: 2,
              node_text: "Saturday"
            },
            {
              node_cluster_id: "9f75d787-c645-4a26-b1ba-257219380b8e-prototype",
              node_id: "9f75d787-c645-4a26-b1ba-257219380b8e",
              is_mention_id: false,
              id: 3,
              node_text: "street"
            },
            {
              node_cluster_id: "4b44256f-fc4c-4753-bda0-bd556dd38b09-prototype",
              node_id: "4b44256f-fc4c-4753-bda0-bd556dd38b09",
              is_mention_id: false,
              id: 4,
              node_text: "Friday"
            },
            {
              node_cluster_id: "d3b53c8a-b9c6-4a8f-b93a-ad4697239abb-prototype",
              node_id: "8fa907f8-3ebc-4771-9b78-2fa2694e6da2",
              is_mention_id: false,
              id: 5,
              node_text: "Odessa"
            }
          ]
        },
        {
          directed: false,
          links: [
            {
              source: 0,
              target: 1,
              key: 0,
              edge_relation: "Time-Conflict_Attack"
            },
            {
              source: 0,
              target: 2,
              key: 0,
              edge_relation: "Target-Conflict_Attack"
            },
            {
              source: 0,
              target: 2,
              key: 1,
              edge_relation: "Target-Conflict_Attack"
            },
            {
              source: 0,
              target: 3,
              key: 0,
              edge_relation: "Time-Conflict_Attack"
            },
            {
              source: 0,
              target: 4,
              key: 0,
              edge_relation: "Attacker-Conflict_Attack"
            }
          ],
          multigraph: true,
          graph: {},
          meta_data: {
            scores: [
              ["scorer_li", 0.0],
              ["scorer_nd", 0.05884254631933085],
              ["scorer_ei", 0.13717625549434764],
              ["scorer_nc", 0.05322161423774322],
              ["scorer_er", 0.0],
              ["scorer_ps", 0.05321625496333066],
              ["scorer_eec", 0.02251229154918901],
              ["scorer_qer", 0.0],
              ["scorer_hs", 0.05359638678145311],
              ["scorer_x", 0.005251564146506786]
            ]
          },
          nodes: [
            {
              node_cluster_id: "55a9af90-e389-4d95-9712-590bd7846aae-prototype",
              node_id: "55a9af90-e389-4d95-9712-590bd7846aae",
              is_mention_id: true,
              id: 0,
              node_text: ""
            },
            {
              node_cluster_id: "1eb9c2cf-b081-46c0-a95b-2f666076fcdb-prototype",
              node_id: "1eb9c2cf-b081-46c0-a95b-2f666076fcdb",
              is_mention_id: false,
              id: 1,
              node_text: "June 30"
            },
            {
              node_cluster_id: "bbc0fff0-5721-41b0-a3e7-67c90d08920d-prototype",
              node_id: "a5e28e07-6076-40f7-bc6e-14f2e81128e4",
              is_mention_id: false,
              id: 2,
              node_text: "pro-Russian separatists"
            },
            {
              node_cluster_id: "d10f8c03-7bf6-4a48-ba25-770ba81269ec-prototype",
              node_id: "d10f8c03-7bf6-4a48-ba25-770ba81269ec",
              is_mention_id: false,
              id: 3,
              node_text: "May 30"
            },
            {
              node_cluster_id: "f27032aa-e7c1-4c33-8dff-bf82c7e48b47-prototype",
              node_id: "bf03b0fe-160e-4cbf-b8fb-aed868b6a7c1",
              is_mention_id: false,
              id: 4,
              node_text: "defense"
            }
          ]
        },
        {
          directed: false,
          links: [
            {
              source: 0,
              target: 1,
              key: 0,
              edge_relation: "Target-Conflict_Attack"
            },
            {
              source: 0,
              target: 1,
              key: 1,
              edge_relation: "Target-Conflict_Attack"
            },
            {
              source: 1,
              target: 2,
              key: 0,
              edge_relation: "Place-Conflict_Attack"
            },
            {
              source: 1,
              target: 3,
              key: 0,
              edge_relation: "Place-Conflict_Attack"
            }
          ],
          multigraph: true,
          graph: {},
          meta_data: {
            scores: [
              ["scorer_li", 0.0],
              ["scorer_nd", 0.02856100201464597],
              ["scorer_ei", 0.11639197435884042],
              ["scorer_nc", 0.04257729139019457],
              ["scorer_er", 0.0],
              ["scorer_ps", 0.05321625496333066],
              ["scorer_eec", 0.01800983323935121],
              ["scorer_qer", 0.0],
              ["scorer_hs", 0.042877109425162485],
              ["scorer_x", 0.004480626036692375]
            ]
          },
          nodes: [
            {
              node_cluster_id: "2a38fb9f-8de2-4ad4-9e93-b747e90e2fe8-prototype",
              node_id: "2a38fb9f-8de2-4ad4-9e93-b747e90e2fe8",
              is_mention_id: false,
              id: 0,
              node_text:
                "\u041f\u043e\u0432\u0441\u0442\u0430\u043d\u0446\u044b"
            },
            {
              node_cluster_id: "a6152925-29b1-4801-bab1-f71a29cc4c36-prototype",
              node_id: "1efab60e-5963-43fa-b97f-483155155d6b",
              is_mention_id: true,
              id: 1,
              node_text: ""
            },
            {
              node_cluster_id: "d5cbf475-468f-4713-8cee-f7231318b52a-prototype",
              node_id: "340697e4-3b3f-4866-bf1d-7f404d177436",
              is_mention_id: false,
              id: 2,
              node_text:
                "\u0421\u043b\u0430\u0432\u044f\u043d\u0441\u043a\u0430"
            },
            {
              node_cluster_id: "f7cf2971-806b-4fb9-8eb4-e87f7b075d53-prototype",
              node_id: "f7cf2971-806b-4fb9-8eb4-e87f7b075d53",
              is_mention_id: false,
              id: 3,
              node_text:
                "\u043f\u043e\u0441\u0451\u043b\u043a\u0430 \u0421\u0435\u043c\u0451\u043d\u043e\u0432\u043a\u0430"
            }
          ]
        },
        {
          directed: false,
          links: [
            {
              source: 0,
              target: 1,
              key: 0,
              edge_relation: "Origin-Movement_TransportPerson"
            },
            {
              source: 0,
              target: 2,
              key: 0,
              edge_relation: "Destination-Movement_TransportPerson"
            },
            {
              source: 0,
              target: 2,
              key: 1,
              edge_relation: "Destination-Movement_TransportPerson"
            },
            {
              source: 0,
              target: 3,
              key: 0,
              edge_relation: "Person-Movement_TransportPerson"
            },
            {
              source: 0,
              target: 4,
              key: 0,
              edge_relation: "Origin-Movement_TransportPerson"
            }
          ],
          multigraph: true,
          graph: {},
          meta_data: {
            scores: [
              ["scorer_li", 0.0],
              ["scorer_nd", 0.04026068958691058],
              ["scorer_ei", 0.0066509699633623106],
              ["scorer_nc", 0.05322161423774322],
              ["scorer_er", 0.0],
              ["scorer_ps", 0.07095500661777422],
              ["scorer_eec", 0.018760242957657502],
              ["scorer_qer", 0.0],
              ["scorer_hs", 0.05359638678145311],
              ["scorer_x", 0.004188524866539858]
            ]
          },
          nodes: [
            {
              node_cluster_id: "9bf5bf65-bfe6-499d-a255-765129be4b61-prototype",
              node_id: "cb2d999b-dca3-4478-bf67-1bea6f8756be",
              is_mention_id: true,
              id: 0,
              node_text: ""
            },
            {
              node_cluster_id: "d5cbf475-468f-4713-8cee-f7231318b52a-prototype",
              node_id: "4e2712a0-993a-4f4e-afc7-65e831b07bba",
              is_mention_id: false,
              id: 1,
              node_text: "where"
            },
            {
              node_cluster_id: "3c34362b-3213-4daa-83c9-2cf6df026a8a-prototype",
              node_id: "9e099722-4698-4968-93ee-a2e5fe6c9676",
              is_mention_id: false,
              id: 2,
              node_text: "city"
            },
            {
              node_cluster_id: "ff9ae595-ba99-420c-9427-0d0307208d74-prototype",
              node_id: "ff9ae595-ba99-420c-9427-0d0307208d74",
              is_mention_id: false,
              id: 3,
              node_text: "them"
            },
            {
              node_cluster_id: "7bc3ed8c-6488-4b02-a326-680a8961445b-prototype",
              node_id: "b51dd2af-8e6a-47c0-95c5-4daff28bbaba",
              is_mention_id: false,
              id: 4,
              node_text: "Pro-Russian"
            }
          ]
        },
        {
          directed: false,
          links: [
            {
              source: 0,
              target: 1,
              key: 0,
              edge_relation: "Sponsor-GeneralAffiliation_Sponsorship"
            },
            {
              source: 0,
              target: 1,
              key: 1,
              edge_relation: "Sponsor-GeneralAffiliation_Sponsorship"
            },
            {
              source: 0,
              target: 2,
              key: 0,
              edge_relation: "Entity-GeneralAffiliation_Sponsorship"
            }
          ],
          multigraph: true,
          graph: {},
          meta_data: {
            scores: [
              ["scorer_li", 0.0],
              ["scorer_nd", 0.018292081188834762],
              ["scorer_ei", 0.04655678974353617],
              ["scorer_nc", 0.031932968542645934],
              ["scorer_er", 0.0],
              ["scorer_ps", 0.03547750330888711],
              ["scorer_eec", 0.03376843732378351],
              ["scorer_qer", 0.0],
              ["scorer_hs", 0.032157832068871864],
              ["scorer_x", 0.0034722357308192247]
            ]
          },
          nodes: [
            {
              node_cluster_id: "04c770e6-3c6a-4416-b71c-a680d575001b-prototype",
              node_id: "c2b20170-dbe4-4437-af08-4305f85de4b5",
              is_mention_id: true,
              id: 0,
              node_text: ""
            },
            {
              node_cluster_id: "d5cbf475-468f-4713-8cee-f7231318b52a-prototype",
              node_id: "a0b04290-992d-475e-aa61-bfbb78977422",
              is_mention_id: false,
              id: 1,
              node_text: "Russia"
            },
            {
              node_cluster_id: "e20ab4d1-4ea1-40d1-852f-40b53ac295a1-prototype",
              node_id: "e20ab4d1-4ea1-40d1-852f-40b53ac295a1",
              is_mention_id: false,
              id: 2,
              node_text: "its"
            }
          ]
        },
        {
          directed: false,
          links: [
            {
              source: 0,
              target: 1,
              key: 0,
              edge_relation:
                "Organization-OrganizationAffiliation_EmploymentMembership"
            },
            {
              source: 0,
              target: 1,
              key: 1,
              edge_relation:
                "Organization-OrganizationAffiliation_EmploymentMembership"
            },
            {
              source: 0,
              target: 2,
              key: 0,
              edge_relation:
                "Employee-OrganizationAffiliation_EmploymentMembership"
            }
          ],
          multigraph: true,
          graph: {},
          meta_data: {
            scores: [
              ["scorer_li", 0.0],
              ["scorer_nd", 0.02112665881722201],
              ["scorer_ei", 0.044894047252695586],
              ["scorer_nc", 0.031932968542645934],
              ["scorer_er", 0.0],
              ["scorer_ps", 0.03547750330888711],
              ["scorer_eec", 0.03376843732378351],
              ["scorer_qer", 0.0],
              ["scorer_hs", 0.032157832068871864],
              ["scorer_x", 0.003455608305910819]
            ]
          },
          nodes: [
            {
              node_cluster_id: "324639d4-ca26-490c-92e7-887d6430fa38-prototype",
              node_id: "2d1389e3-f22e-48ba-a70c-7fe93580ac66",
              is_mention_id: true,
              id: 0,
              node_text: ""
            },
            {
              node_cluster_id: "d5cbf475-468f-4713-8cee-f7231318b52a-prototype",
              node_id: "84e3ecd6-5839-4538-b6ec-ffa6a3a00e51",
              is_mention_id: false,
              id: 1,
              node_text: "we"
            },
            {
              node_cluster_id: "c54e1ac0-b173-4022-b231-4a9418a48d64-prototype",
              node_id: "c54e1ac0-b173-4022-b231-4a9418a48d64",
              is_mention_id: false,
              id: 2,
              node_text: "leader"
            }
          ]
        },
        {
          directed: false,
          links: [
            {
              source: 0,
              target: 1,
              key: 0,
              edge_relation: "Member-PartWhole_Membership"
            },
            {
              source: 0,
              target: 1,
              key: 1,
              edge_relation: "Member-PartWhole_Membership"
            },
            {
              source: 0,
              target: 2,
              key: 0,
              edge_relation: "Organization-PartWhole_Membership"
            }
          ],
          multigraph: true,
          graph: {},
          meta_data: {
            scores: [
              ["scorer_li", 0.0],
              ["scorer_nd", 0.011540780344148065],
              ["scorer_ei", 0.039905819780173865],
              ["scorer_nc", 0.031932968542645934],
              ["scorer_er", 0.0],
              ["scorer_ps", 0.03547750330888711],
              ["scorer_eec", 0.03376843732378351],
              ["scorer_qer", 0.0],
              ["scorer_hs", 0.032157832068871864],
              ["scorer_x", 0.003405726031185601]
            ]
          },
          nodes: [
            {
              node_cluster_id: "ea779ea7-6758-4dc1-9584-87c5942010c6-prototype",
              node_id: "7ce9bb45-6836-4a12-b00e-2d8fe752ae35",
              is_mention_id: true,
              id: 0,
              node_text: ""
            },
            {
              node_cluster_id: "d5cbf475-468f-4713-8cee-f7231318b52a-prototype",
              node_id: "84e3ecd6-5839-4538-b6ec-ffa6a3a00e51",
              is_mention_id: false,
              id: 1,
              node_text: "we"
            },
            {
              node_cluster_id: "d5cbf475-468f-4713-8cee-f7231318b52a-prototype",
              node_id: "ca864ded-d28f-4ca5-963b-30e4ccf0f7ff",
              is_mention_id: false,
              id: 2,
              node_text: "Donetsk"
            }
          ]
        }
      ]
    };
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    });
  }

  handleAddHypothesis(index) {
    var hypo = this.state.hypothesis[index];
    // add nodes and add edges
    var newNodes = this.state.nodes.slice();
    var incomingNodes = [];
    // for (i = 0; i < hypo.)

    console.log(hypo);
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/search/179/?search=${this.state.search}`
      );
      var newNodes = this.state.nodes.slice();
      var incomingNodes = [];
      for (let i = 0; i < data.length; i++) {
        var newNode = {};
        var node = data[i];
        if (this.state.nodes.findIndex(x => x.id === node.id) === -1) {
          newNode["id"] = node["id"];
          newNode["label"] = node["label"];
          newNode["title"] = node["title"];
          newNode["color"] =
            node["type"] === "event"
              ? { background: "#ffb3ff", border: "#d62ad6" }
              : { background: "#bcffff", border: "#2fcfce" };
          newNode["shape"] = node["type"] === "event" ? "triangle" : "dot";
          newNodes.push(newNode);
          incomingNodes.push(newNode);
        }
      }
      this.state.network.body.data.nodes.add(incomingNodes);
      this.setState({
        nodes: newNodes
      });
      await this.addNetworkListener();
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    await this.fetchDataset();
    await this.populateNetwork();
  }

  async addNetworkListener() {
    var that = this;
    this.state.network.on("click", function(properties) {
      var ids = properties.nodes;
      console.log(ids && ids[0]);
      ids && that.fetchNeighbors(ids[0]);
    });
  }

  async fetchNeighbors(id) {
    if (this.state.clicked.findIndex(x => x === id) !== -1) {
      return;
    }
    try {
      var newClicked = this.state.clicked.slice();
      newClicked.push(id);
      this.setState({
        clicked: newClicked
      });
      var node = this.state.nodes.find(x => x.id === id);
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/searchneighbors/?nid=${node.title}`
      );

      var incomingNodes = [];
      var newNodes = this.state.nodes.slice();
      var newEdges = this.state.edges.slice();
      var incomingEdges = [];
      for (let i = 0; i < data.nodes.length; i++) {
        var newNode = {};
        var node = data.nodes[i];
        if (this.state.nodes.findIndex(x => x.id === node.id) === -1) {
          newNode["id"] = node["id"];
          newNode["label"] = node["label"];
          newNode["title"] = node["title"];
          newNode["color"] =
            node["type"] === "event"
              ? { background: "#ffb3ff", border: "#d62ad6" }
              : { background: "#bcffff", border: "#2fcfce" };
          newNode["shape"] = node["type"] === "event" ? "triangle" : "dot";
          incomingNodes.push(newNode);
          newNodes.push(newNode);
        }
      }
      for (let i = 0; i < data.edges.length; i++) {
        var edge = data.edges[i];
        var newEdge = {};
        newEdge["from"] = edge["from_node_id"];
        newEdge["to"] = edge["to_node_id"];
        newEdge["title"] = edge["title"];
        newEdges.push(newEdge);
        incomingEdges.push(newEdge);
      }

      this.state.network.body.data.nodes.add(incomingNodes);
      this.state.network.body.data.edges.add(incomingEdges);
      this.setState({
        nodes: newNodes,
        edges: newEdges
      });
      await this.addNetworkListener();
    } catch (error) {
      console.log(error);
    }
  }

  async populateNetwork() {
    var network = new Network(
      this.refs.graphRef,
      { nodes: this.state.nodes, edges: this.state.edges },
      {}
    );
    this.setState({
      network: network
    });
  }

  async fetchDataset() {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/datasets/${this.state.datasetId}`
      );
      this.setState({
        dataset: data
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const hypList = this.state.hypothesis.map((hyp, index) => {
      return (
        <button
          className="list-group-item list-group-item-action"
          key={index}
          onClick={() => this.handleAddHypothesis(index)}
        >
          Hypothesis - {index}
        </button>
      );
    });
    return (
      <div className="card">
        <div className="card-header">
          <form onSubmit={this.handleSubmit} className="input-group">
            <FormControl
              type="text"
              placeholder="Enter topic name"
              value={this.state.search}
              onChange={this.handleChange}
            />
            <Button variant="primary" type="submit" className="input-group-btn">
              Submit
            </Button>
          </form>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-xs-10 col-sm-3">
              <ul className="list-group">{hypList}</ul>
            </div>
            <div className="col-xs-10 col-sm-9" ref="graphRef" />
          </div>
        </div>
      </div>
    );
  }
}

export default Hypothesis;
