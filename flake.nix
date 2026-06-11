{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-26.05";
  };

  outputs =
    { self, nixpkgs }:
    let
      forAllSupportedSystems = nixpkgs.lib.genAttrs nixpkgs.lib.systems.flakeExposed;
    in
    {
      devShells = forAllSupportedSystems (
        system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        ({ default = pkgs.callPackage ./shell.nix { }; })
      );
    };
}
