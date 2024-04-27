
local EXAMPLE_1 = "Game 55: 4 blue, 1 red; 3 red, 7 blue; 12 red, 4 green, 8 blue; 3 green, 5 blue, 1 red; 13 blue, 12 red, 1 green 4 blue, 1 red"

function mysplit (inputstr, sep)
    if sep == nil then
            sep = "%s"
    end
    local t={}
    for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
            table.insert(t, str)
    end
    return t
end

local game_id = EXAMPLE_1:match("([^:]+):")

print(game_id)

local game_record_arr = {}

for str in string.gmatch(EXAMPLE_1, ":([^;]+);") do
    table.insert(game_record_arr, str)
end

print(table.concat(game_record_arr, ", "))

print("--")
game_record_arr = {}
print(table.concat(game_record_arr, ", "))

game_record_arr = mysplit(EXAMPLE_1, ";")
print(table.concat(game_record_arr, ", "))
