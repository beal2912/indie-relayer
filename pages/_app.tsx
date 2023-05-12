import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ChainProvider,
  defaultTheme as cosmosKitTheme,
} from "@cosmos-kit/react";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import theme from "../config/theme";
import { SignerOptions } from "@cosmos-kit/core";
import { chains, assets } from "chain-registry";
import { Chain } from "@chain-registry/types";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";

const customChains: Chain[] = [
  ...chains,
  {
    $schema: "../../chain.schema.json",
    chain_name: "iristestnet",
    status: "live",
    network_type: "testnet",
    website: "https://stargaze.zone/",
    pretty_name: "Irisnet Testnet",
    chain_id: "gon-irishub-1",
    bech32_prefix: "iaa",
    daemon_name: "starsd",
    node_home: "$HOME/.starsd",
    slip44: 118,
    fees: {
      fee_tokens: [
        {
          denom: "uiris",
          low_gas_price: 0.03,
          average_gas_price: 0.04,
          high_gas_price: 0.05,
        },
      ],
    },
    codebase: {
      git_repo: "https://github.com/public-awesome/stargaze",
      recommended_version: "v7.0.0",
      compatible_versions: ["v7.0.0"],
      cosmos_sdk_version: "0.45",
      tendermint_version: "0.34",
      cosmwasm_version: "0.28",
      cosmwasm_enabled: true,
      genesis: {
        genesis_url:
          "https://github.com/public-awesome/testnets/blob/main/elgafar-1/genesis/genesis.tar.gz",
      },
    },
    peers: {
      seeds: [],
      persistent_peers: [
        {
          id: "e31886cba90a06e165b0df18cc5c8ae015ecd23e",
          address: "209.159.152.82:26656",
          provider: "stargaze",
        },
        {
          id: "de00d2d65594b672469ecd65826a94ec1be80b9f",
          address: "208.73.205.226:26656",
          provider: "stargaze",
        },
      ],
    },
    apis: {
      rpc: [
        {
          address: "http://34.80.93.133:26657",
          provider: "Stargaze Foundation",
        },
      ],
      rest: [
        {
          address: "https://api.gon.irisnet.org",
          provider: "Stargaze Foundation",
        },
      ],
      grpc: [
        {
          address: "http://34.80.93.133:9090",
          provider: "Stargaze Foundation",
        },
      ],
    },
    explorers: [
      {
        kind: "ping.pub",
        url: "https://gon.ping.pub/iris",
        tx_page: "https://gon.ping.pub/iris/tx/${txHash}",
      },
    ],
  },
{
  $schema: "../chain.schema.json",
  chain_name: "terra2",
  status: "live",
  network_type: "mainnet",
  website: "https://www.terra.money/",
  pretty_name: "Terra 2.0",
  chain_id: "phoenix-1",
  daemon_name: "terrad",
  node_home: "$HOME/.terra",
  bech32_prefix: "terra",
  slip44: 330,
  fees: {
    fee_tokens: [
      {
        denom: "uluna",
        fixed_min_gas_price: 0.0125,
        low_gas_price: 0.0125,
        average_gas_price: 0.015,
        high_gas_price: 0.04
      }
    ]
  },
  staking: {
    staking_tokens: [
      {
        denom: "uluna"
      }
    ]
  },
  codebase: {
    git_repo: "https://github.com/terra-money/core/",
    recommended_version: "v2.3.1",
    compatible_versions: [
      "v2.3.0",
      "v2.3.1"
    ],
    cosmos_sdk_version: "0.46.9",
    cosmwasm_enabled: true,
    cosmwasm_version: "0.30.0",
    ibc_go_version: "6.1.0",
    genesis: {
      name: "v2.0",
      genesis_url: "https://tfl-phoenix-1.s3.amazonaws.com/genesis.json"
    },
    versions: [
      {
        name: "v2.3",
        tag: "v2.3.1",
        height: 4711800,
        recommended_version: "v2.3.1",
        compatible_versions: [
          "v2.3.0",
          "v2.3.1"
        ],
        cosmos_sdk_version: "0.46.9",
        cosmwasm_enabled: true,
        cosmwasm_version: "0.30.0",
        ibc_go_version: "6.1.0",
      }
    ]
  },
  logo_URIs: {
    png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra2/images/luna.png",
    svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra2/images/luna.svg"
 
  },
  peers: {
    seeds: [
      {
        id: "ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0",
        address: "seeds.polkachu.com:11756",
        provider: "Polkachu"
      },
      {
        id: "a8d12536bdcc210ac35a9f092f3295360b97830d",
        address: "seed-terra-01.stakeflow.io:33007",
        provider: "Genesis Lab"
      }
    ],
    persistent_peers: [
      {
        id: "0f1096278efafcf3f0d3bd5b6544e6b8dcc36a0e",
        address: "206.189.129.195:26656"
      },
      {
        id: "9038d63588e0ab421fa71582720c1efb1ee867f6",
        address: "45.34.1.114:27656"
      },
      {
        id: "f2069012aec5ced4e88e7e4311391eabe72bb5a3",
        address: "node-phoenix.terra.lunastations.online:26656"
      },
      {
        id: "86bd5cb6e762f673f1706e5889e039d5406b4b90",
        address: "terra.seed.node75.org:10856",
        provider: "Pro-Nodes75"
      },
      {
        id: "a8d12536bdcc210ac35a9f092f3295360b97830d",
        address: "peer-terra-01.stakeflow.io:33007",
        provider: "Genesis Lab"
      }
    ]
  },
  apis: {
    rpc: [
      {
        address: "https://terra-rpc.polkachu.com",
        provider: "polkachu"
      },
      {
        address: "https://terra-rpc.stakely.io:443/",
        provider: "stakely"
      },
      {
        address: "https://rpc-terra2.whispernode.com:443",
        provider: "WhisperNode"
      },
      
    ],
    rest: [
      {
        address: "https://lcd-terra2.whispernode.com:443",
        provider: "WhisperNode"
      },
      {
        address: "https://phoenix-lcd.terra.dev:443",
        provider: "Terraform Labs"
      }
    ],
    grpc: [
      {
        address: "terra-grpc.polkachu.com:11790",
        provider: "Polkachu"
      },
      {
        address: "terra-mainnet-grpc.autostake.com:443",
        provider: "AutoStake  Slash Protected"
      },
    ]
  },
  explorers: [
    {
      kind: "atomscan",
      url: "https://atomscan.com/terra2",
      tx_page: "https://atomscan.com/terra2/transactions/${txHash}",
      account_page: "https://atomscan.com/terra2/accounts/${accountAddress}"
    }
  ]
}
];

console.log(chains.find((c) => c.chain_name == "stargazetestnet"));
const qc = new QueryClient({});
function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const signerOptions: SignerOptions = {
    // signingStargate: (_chain: Chain) => {
    //   return getSigningCosmosClientOptions();
    // }
  };

  const { colorMode } = useColorMode();
  return (
    <ChakraProvider theme={cosmosKitTheme}>
      <ChainProvider
        chains={customChains}
        assetLists={assets}
        wallets={[...keplrWallets, ...cosmostationWallets, ...leapWallets]}
        walletConnectOptions={{
          signClient: {
            projectId: "a8510432ebb71e6948cfd6cde54b70f7",
            relayUrl: "wss://relay.walletconnect.org",
            metadata: {
              name: "CosmosKit Template",
              description: "CosmosKit dapp template",
              url: "https://docs.cosmoskit.com/",
              icons: [],
            },
          },
        }}
        wrappedWithChakra={true}
        signerOptions={signerOptions}
      >
        <QueryClientProvider client={qc}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChainProvider>
    </ChakraProvider>
  );
}

export default CreateCosmosApp;
