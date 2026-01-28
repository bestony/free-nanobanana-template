type HelloWorldProps = {
  name?: string;
};

export function HelloWorld({ name = "World" }: HelloWorldProps) {
  return <p>Hello, {name}!</p>;
}
