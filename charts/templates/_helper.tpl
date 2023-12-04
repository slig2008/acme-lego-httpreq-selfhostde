{{- define "nullOrEmpty" }}
  {{- $object := index . 0 }}
  {{- $attribute := index . 1 }}
  {{- if hasKey $object $attribute }}
    {{- if get $object $attribute }}
    {{- else }}
      {{- print "true" }}
    {{- end }}
  {{- else }}
    {{- print "true" }}
  {{- end }}
{{- end }}