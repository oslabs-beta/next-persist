interface LooseObject {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface AllowListObject {
  [key: string]: string[];
}

interface StorageConfigObject {
  method: string;
  allowList: AllowListObject;
}

interface WrapperProps {
  wrapperConfig: StorageConfigObject;
  children: React.ReactNode;
}

type Method = (config: AllowListObject, state: LooseObject) => void;

type NextPersistWrapper = (props: WrapperProps) => React.ReactNode;
