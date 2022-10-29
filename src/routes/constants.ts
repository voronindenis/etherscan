import { joinPath } from './lib';

export enum PathsEnum {
  Root = '/',
  Block = 'block',
  Earliest = 'earliest',
  Latest = 'latest',
  Pending = 'pending',
  id = ':id'
}

export const ROUTES_PATHS = {
  root: PathsEnum.Root,
  latestBlock: joinPath([
    PathsEnum.Root,
    PathsEnum.Block,
    PathsEnum.Latest,
  ]),
  earliestBlock: joinPath([
    PathsEnum.Root,
    PathsEnum.Block,
    PathsEnum.Earliest,
  ]),
  pendingBlock: joinPath([
    PathsEnum.Root,
    PathsEnum.Block,
    PathsEnum.Pending,
  ]),
  blockById: joinPath([
    PathsEnum.Root,
    PathsEnum.Block,
    PathsEnum.id,
  ]),
};
