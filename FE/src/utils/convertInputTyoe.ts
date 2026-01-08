export const convertInputType = (apiInputType: string): string => {
    const typeMapping: { [key: string]: string } = {
      'text': 'text',
      'string': 'text',
      'varchar': 'text',
      'nvarchar': 'text',
      'char': 'text',
      'nchar': 'text',
      
      'textarea': 'textarea',
      'text_area': 'textarea',
      'longtext': 'textarea',
      'ntext': 'textarea',
      
      'number': 'number',
      'int': 'number',
      'integer': 'number',
      'bigint': 'number',
      'smallint': 'number',
      'tinyint': 'number',
      'decimal': 'number',
      'numeric': 'number',
      'float': 'number',
      'double': 'number',
      'real': 'number',
      
      'date': 'date',
      'datetime': 'date',
      'datetime2': 'date',
      'smalldatetime': 'date',
      'timestamp': 'date',
      'time': 'date',
      
      'boolean': 'checkbox',
      'bit': 'checkbox',
      'bool': 'checkbox',
      
      'select': 'select',
      'dropdown': 'select',
      'enum': 'select',
      'list': 'select',
      
      'email': 'text',
      'url': 'text',
      'phone': 'text',
      'tel': 'text',
      
      'password': 'text',
      'hidden': 'text',
      
      'file': 'text', // Tạm thời dùng text, có thể mở rộng sau
      'image': 'text',
      
      'json': 'textarea',
      'xml': 'textarea'
    };
    
    const normalizedType = apiInputType.toLowerCase().trim();
    return typeMapping[normalizedType] || 'text'; // Default to text if not found
  };
  