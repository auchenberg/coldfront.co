require 'sinatra'

get '/' do
 erb :'index'
end

get '/main' do
 erb :'main'
end
