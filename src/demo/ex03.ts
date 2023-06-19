export const source03 = `
push 0
set_global i
CHECK:
get_global i
push 10
equal
jump_if END
get_global i
print
get_global i
push 1
add
set_global i
jump CHECK
END:
`;
