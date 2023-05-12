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
  "$schema": "../chain.schema.json",
  "chain_name": "terra2",
  "status": "live",
  "network_type": "mainnet",
  "website": "https://www.terra.money/",
  "pretty_name": "Terra 2.0",
  "chain_id": "phoenix-1",
  "daemon_name": "terrad",
  "node_home": "$HOME/.terra",
  "bech32_prefix": "terra",
  "slip44": 330,
  "fees": {
    "fee_tokens": [
      {
        "denom": "uluna",
        "fixed_min_gas_price": 0.0125,
        "low_gas_price": 0.0125,
        "average_gas_price": 0.015,
        "high_gas_price": 0.04
      }
    ]
  },
  "staking": {
    "staking_tokens": [
      {
        "denom": "uluna"
      }
    ]
  },
  "codebase": {
    "git_repo": "https://github.com/terra-money/core/",
    "recommended_version": "v2.3.1",
    "compatible_versions": [
      "v2.3.0",
      "v2.3.1"
    ],
    "cosmos_sdk_version": "0.46.9",
    "cosmwasm_enabled": true,
    "cosmwasm_version": "0.30.0",
    "ibc_go_version": "6.1.0",
    "binaries": {
      "linux/amd64": "https://github.com/terra-money/core/releases/download/v2.3.1/terra_2.3.1_Linux_x86_64.tar.gz?checksum=sha256:fe56cdb087a848106fcfbbd5e1a76ec021f192662952a203375f98a30fb058e0",
      "linux/arm64": "https://github.com/terra-money/core/releases/download/v2.3.1/terra_2.3.1_Linux_arm64.tar.gz?checksum=sha256:c4caed39a714e363c65b7d0bfe62c7ade9463371591b31e823aafd80617b3b6b"
    },
    "genesis": {
      "name": "v2.0",
      "genesis_url": "https://tfl-phoenix-1.s3.amazonaws.com/genesis.json"
    },
    "versions": [
      {
        "name": "v2.0",
        "tag": "v2.0.1",
        "recommended_version": "v2.0.1",
        "height": 0,
        "next_version_name": "v2.1",
        "binaries": {
          "linux/amd64": "https://github.com/terra-money/core/releases/download/v2.0.1/terra_2.0.1_Linux_x86_64.tar.gz?checksum=sha256:eae23aad59b36ea2adaa541a7662a6119569279d2e6c4013e3deee96e9263b30",
          "darwin/amd64": "https://github.com/terra-money/core/releases/download/v2.0.1/terra_2.0.1_Darwin_x86_64.tar.gz?checksum=sha256:c2a6b1bff922b127a31757bdb0c8f05a34f3b1f879dee1e862f9f8b748e15a54"
        }
      },
      {
        "name": "v2.1",
        "tag": "v2.1.4",
        "recommended_version": "v2.1.4",
        "height": 890000,
        "next_version_name": "v2.2",
        "binaries": {
          "linux/amd64": "https://github.com/terra-money/core/releases/download/v2.1.4/terra_2.1.4_Linux_x86_64.tar.gz?checksum=sha256:e05b85ae2eac5df886f4f9d0ecf719b82ebe4da4fc59cae93a34af7c3e89ddfb",
          "darwin/amd64": "https://github.com/terra-money/core/releases/download/v2.1.4/terra_2.1.4_Darwin_x86_64.tar.gz?checksum=sha256:4b66ebf800cb903f7b6c07686636eff43e686f5956c9fadc307f077afd7f23bb"
        }
      },
      {
        "name": "v2.2",
        "tag": "v2.2.1",
        "height": 2979805,
        "recommended_version": "v2.2.1",
        "compatible_versions": [
          "v2.2.0",
          "v2.2.1"
        ],
        "cosmwasm_enabled": true,
        "binaries": {
          "linux/amd64": "https://github.com/terra-money/core/releases/download/v2.2.1/terra_2.2.1_Linux_x86_64.tar.gz?checksum=sha256:8a9353ae3c33a750ce2a9d236f00c12c5449c41fad96e9885a5c0b8678fcf8bc"
        }
      },
      {
        "name": "v2.3",
        "tag": "v2.3.1",
        "height": 4711800,
        "recommended_version": "v2.3.1",
        "compatible_versions": [
          "v2.3.0",
          "v2.3.1"
        ],
        "cosmos_sdk_version": "0.46.9",
        "cosmwasm_enabled": true,
        "cosmwasm_version": "0.30.0",
        "ibc_go_version": "6.1.0",
        "binaries": {
          "linux/amd64": "https://github.com/terra-money/core/releases/download/v2.3.1/terra_2.3.1_Linux_x86_64.tar.gz?checksum=sha256:fe56cdb087a848106fcfbbd5e1a76ec021f192662952a203375f98a30fb058e0",
          "linux/arm64": "https://github.com/terra-money/core/releases/download/v2.3.1/terra_2.3.1_Linux_arm64.tar.gz?checksum=sha256:c4caed39a714e363c65b7d0bfe62c7ade9463371591b31e823aafd80617b3b6b"
        }
      }
    ]
  },
  "logo_URIs": {
    "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra2/images/luna.png",
    "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra2/images/luna.svg"
  },
  "peers": {
    "seeds": [
      {
        "id": "406bcf90a7b29df6ae475a1f94abe04ebde805af",
        "address": "phoenix.seed.stakebin.io:16656"
      },
      {
        "id": "ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0",
        "address": "seeds.polkachu.com:11756",
        "provider": "Polkachu"
      },
      {
        "id": "20e1000e88125698264454a884812746c2eb4807",
        "address": "seeds.lavenderfive.com:11756",
        "provider": "Lavender.Five Nodes 🐝"
      },
      {
        "id": "ebc272824924ea1a27ea3183dd0b9ba713494f83",
        "address": "terra-mainnet-seed.autostake.com:26676",
        "provider": "AutoStake 🛡️ Slash Protected"
      },
      {
        "id": "e1b058e5cfa2b836ddaa496b10911da62dcf182e",
        "address": "terra-seed-1.allnodes.me:26656",
        "provider": "Allnodes.com ⚡️ Nodes & Staking"
      },
      {
        "id": "e726816f42831689eab9378d5d577f1d06d25716",
        "address": "terra-seed-2.allnodes.me:26656",
        "provider": "Allnodes.com ⚡️ Nodes & Staking"
      },
      {
        "id": "1e094db9c147a0fd5e9793365d66736c80bfef46",
        "address": "seeds.whispernode.com:11756",
        "provider": "WhisperNode🤐"
      },
      {
        "id": "a8d12536bdcc210ac35a9f092f3295360b97830d",
        "address": "seed-terra-01.stakeflow.io:33007",
        "provider": "Genesis Lab"
      }
    ],
    "persistent_peers": [
      {
        "id": "0f1096278efafcf3f0d3bd5b6544e6b8dcc36a0e",
        "address": "206.189.129.195:26656"
      },
      {
        "id": "9038d63588e0ab421fa71582720c1efb1ee867f6",
        "address": "45.34.1.114:27656"
      },
      {
        "id": "f2069012aec5ced4e88e7e4311391eabe72bb5a3",
        "address": "node-phoenix.terra.lunastations.online:26656"
      },
      {
        "id": "ebc272824924ea1a27ea3183dd0b9ba713494f83",
        "address": "terra-mainnet-peer.autostake.com:26676",
        "provider": "AutoStake 🛡️ Slash Protected"
      },
      {
        "id": "86bd5cb6e762f673f1706e5889e039d5406b4b90",
        "address": "terra.seed.node75.org:10856",
        "provider": "Pro-Nodes75"
      },
      {
        "id": "a8d12536bdcc210ac35a9f092f3295360b97830d",
        "address": "peer-terra-01.stakeflow.io:33007",
        "provider": "Genesis Lab"
      }
    ]
  },
  "apis": {
    "rpc": [
      {
        "address": "https://terra-rpc.polkachu.com",
        "provider": "polkachu"
      },
      {
        "address": "https://terra-rpc.stakely.io:443/",
        "provider": "stakely"
      },
      {
        "address": "https://rpc-terra2.whispernode.com:443",
        "provider": "WhisperNode"
      },
      {
        "address": "https://terra-mainnet-rpc.autostake.com:443",
        "provider": "AutoStake  Slash Protected"
      },
      {
        "address": "https://phoenix-rpc.terra.dev:443",
        "provider": "Terraform Labs"
      },
      {
        "address": "https://terra-rpc.publicnode.com",
        "provider": "Allnodes.com  Nodes & Staking"
      },
      {
        "address": "https://rpc-terra-01.stakeflow.io",
        "provider": "Genesis Lab"
      }
    ],
    "rest": [
      {
        "address": "https://lcd-terra2.whispernode.com:443",
        "provider": "WhisperNode"
      },
      {
        "address": "https://phoenix-lcd.terra.dev:443",
        "provider": "Terraform Labs"
      },
      {
        "address": "https://terra-rest.publicnode.com",
        "provider": "Allnodes.com  Nodes & Staking"
      },
      {
        "address": "https://api-terra-01.stakeflow.io",
        "provider": "Genesis Lab"
      }
    ],
    "grpc": [
      {
        "address": "terra-grpc.polkachu.com:11790",
        "provider": "Polkachu"
      },
      {
        "address": "terra-mainnet-grpc.autostake.com:443",
        "provider": "AutoStake  Slash Protected"
      },
      {
        "address": "https://terra-grpc.publicnode.com",
        "provider": "Allnodes.com  Nodes & Staking"
      },
      {
        "address": "grpc-terra-01.stakeflow.io:1102",
        "provider": "Genesis Lab"
      }
    ]
  },
  "explorers": [
    {
      "kind": "atomscan",
      "url": "https://atomscan.com/terra2",
      "tx_page": "https://atomscan.com/terra2/transactions/${txHash}",
      "account_page": "https://atomscan.com/terra2/accounts/${accountAddress}"
    },
    {
      "kind": "finder",
      "url": "http://finder.terra.money/",
      "tx_page": "https://finder.terra.money/mainnet/tx/${txHash}",
      "account_page": "https://finder.terra.money/mainnet/address/${accountAddress}"
    },
    {
      "kind": "Stakeflow",
      "url": "https://stakeflow.io/terra",
      "account_page": "https://stakeflow.io/terra/accounts/${accountAddress}"
    }
  ]
},
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
