json.array!(@activities) do |activity|
  json.extract! activity, :id, :title, :address, :begin_at, :end_at, :max_amount, :more_detail, :user_id
  json.url activity_url(activity, format: :json)
end
